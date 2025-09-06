
// Импорт библеотек

// чтение env переменных
require('dotenv').config();

//  1.библеотека для создания сервера
const express = require('express');

//  2.СORS разрешает доступ с других источников( например делать запросы с фронта)
const cors = require('cors');

//  встроный модуль для работы с файловой системой.
const fs = require('fs')

// 3.PDKit для генерации пдф файлов
const pdfDoc = require('pdfkit');

// 4.cоздание экзеспляра приложения 
const app = express();

// path
const path = require('path')

// подключение mongoDB
const connectDb = require('./db');

// 5.включаем мидлвеер CORS. Позволяет принимать запросы с других портов. без этого браузер блокнет запрос
app.use(cors());

// 6.разрешаем серверу читать JSON в теле запроса
app.use(express.json());

// подключение firebase
// const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json');



// admin.initializeApp({
//     credential:admin.credential.cert(serviceAccount)
// })
// const db = admin.firestore();

// обрабатываем POST запрос. адресс с фронта будет generate-pdf
//  метод post принимает адрес и колбэк, в колбэке два параметра, первый req тут будет тело запроса с фронта, res - ответ который мы отправим на фронт. 
app.post('/generate-pdf',  (req,res)=>{
    //  достаем поля из тела запроса
    const {chekidWork, squareData, ceilingHeight,totalPriceRub,totalUsdPrice,userEmail} = req.body;
    
    //  создаем новый pdf документ
    const doc = new pdfDoc(); 

    
    //  имя для отправки на клиент
    const fixDate = new Date().toLocaleDateString().split('.').reverse().join('-');
    const fixTime = new Date().toLocaleTimeString().split(':').slice(0,2).join('-');
    const fileName = `Summary_${fixDate}_${fixTime}.pdf`
    
    //  создаем уникальное имя файла и путь к нему
    const filePath = `./output/${fileName}`

    //  путь до шрифта
    const fontPath = './fonts/DejaVuSans.ttf'
    
    const fontPathTitle = './fonts/DejaVuSans-Bold.ttf'
    // куда будет сохраняться пдф файл
    const stream = fs.createWriteStream(filePath)
    doc.pipe(stream);
// ============================================================== //
    // Наполняем PDF файл
    doc.font(fontPath) 
    // Заголовок
    doc.font(fontPathTitle).fontSize(25).text('Отчет',{ align: 'center' }) 
    doc.fontSize(20).text(`Итоговая сумма в рублях: ${totalPriceRub}руб.`,{align:'center'})
    doc.fontSize(20).text(`Итоговая сумма в долларах: ${totalUsdPrice}$`, {align: 'center'})
    doc.font(fontPath) 
    doc.moveDown()
    doc.text('--------------------------------------------',{align:'center'})
    doc.moveDown(); // добавляем отступ вниз
    doc.fontSize(16).text(`Высота потолка: ${ceilingHeight}m2`)
    doc.moveDown()
    doc.fontSize(18).text('Площадь:') 
    doc.moveDown()
    squareData.forEach(square => {
        doc.fontSize(16).text(`${square.name} / ${square.value} м2`)
    })
    doc.moveDown();
    doc.fontSize(18).text('Выбранные работы:')
    doc.moveDown()
    chekidWork.forEach(work => {
        doc.fontSize(16).text(`${work.name}: ${work.count}${work.unit}`)
    });
    doc.moveDown();
    doc.end() // завершаем запись пдф

  

    //  сохраняем данные в монгоДб
     stream.on('finish', async ()=> {
        // записываем файл в монгоДБ
        const db = await connectDb();
        const filesCollection = db.collection('files');
          await filesCollection.insertOne({
            fileName: fileName,
            createdAt: new Date().toLocaleDateString(),
            userEmail: userEmail,
            totalPriceRub: totalPriceRub,
            totalUsdPrice: totalUsdPrice

        });
// ===================================================================
          // сохраняем пдф в fireStore
        // await db.collection('files').add({
        //     fileName:fileName,
        //     createAt: new Date().toLocaleDateString(),
        //     userEmail: userEmail
        // })
        //  отправляем файл из папки output
        //  отправляем файл как загрузку 
        //  метод download автоматически установит правильные заголовки ответа
        
        // добавим в заголовки имя файла чтобы получить его на клиенте
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        // 
        res.download(filePath, fileName ,(err) =>{
            if(err){
                console.error('Ошибка при отправке файла:', err);
                res.status(500).send('Ошибка загрузки PDF')
                return
            }
        })

    })

})


// =============================================================


// удаление файла
app.post('/files/delete', async(req,res)=>{
    try{
        // console.log('тело:', req.body)
       const {id} = req.body;
       const db = await connectDb();
       const collection = db.collection('files');
       // Чтобы удалить по MongoDB ObjectId, нужно его преобразовать:
        const ObjectId = require('mongodb').ObjectId;
        await collection.deleteOne({ _id: new ObjectId(id) });
        const data = await collection.find().toArray();
        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({ error: 'Не удалось получить список файлов' });
    }
})

// получение square 
app.get('/squares', async(req,res)=>{
    try{
        const db = await connectDb();
        const collection = db.collection('squares');
        const data = await collection.find().toArray();
        const formattedData = data.map((item) => {
            return {
                id: item.id,
                value: item.value,
                name: item.name
            }
        })
        res.status(200).json(formattedData)
    }catch(e){
        console.error('Ошибка при получении файлов из БД:', e);
        res.status(500).json({ error: 'Не удалось получить список файлов' });
    }
})
// получение operations
app.get('/operations', async(req,res)=>{
    try{
        const db = await connectDb();
        const collection = db.collection('operations');
        const data = await collection.find().toArray();
        const formattedData = data.map((item) => {
            return {
                id: item.id,
                count: item.count,
                unit: item.unit,
                name: item.name
            }
        })
        res.status(200).json(formattedData)
    }catch(e){
        console.error('Ошибка при получении файлов из БД:', e);
        res.status(500).json({ error: 'Не удалось получить список файлов' });
    }
})

// // обрабатываем Get запрос. адресс с фронта будет files
app.get('/files', async(req, res)=> {
    try{
    const db = await connectDb(); // подключение к БД
    const collection = db.collection('files'); // обращение к коллекции
    const data = await collection.find().toArray(); // получаем все записи
    const formattedFiles = data.map(file => ({
      id: file._id.toString(), 
      fileName: file.fileName,
      createdAt: file.createdAt,
      userEmail: file.userEmail,
      totalPriceRub: file.totalPriceRub,
      totalUsdPrice: file.totalUsdPrice,

    }));
    res.status(200).json(formattedFiles);

    // ================================
      
        // const shapshot = await db.collection('files').get();
        // const files = [];
        // shapshot.forEach(doc =>{
        //     // doc это не объект с данными напрямую. это DocumentSnapshot у которого есть метод data(). После вызова этого метода мы получим объект с данными
        //     // const data = doc.data();
        //     // const {fileName, createAt, userEmail} = data
        //     // ===================
        //     // либо просто развернуть объект
        //     files.push({...doc.data()})
        // })
        // res.status(200).json(files)
    }catch(e){
        console.error('Ошибка при получении файлов из БД:', e);
         res.status(500).json({ error: 'Не удалось получить список файлов' });
        // if (e.code === 8) {
        // // Заглушка при превышении квоты
        // res.status(200).json([]);
        // } else {
        // res.status(500).json({ error: 'Не удалось получить список файлов' });
        // }
  
    }
})

//  запускаем сервер на порту 
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>{
   
    console.log(`Сервер запущен ${PORT}`)
})