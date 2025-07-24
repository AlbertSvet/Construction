// Импорт библеотек
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

// 5.включаем мидлвеер CORS. Позволяет принимать запросы с других портов. без этого браузер блокнет запрос
app.use(cors());

// 6.разрешаем серверу читать JSON в теле запроса
app.use(express.json());

// обрабатываем POST запрос. адресс с фронта будет generate-pdf
//  метод post принимает адрес и колбэк, в колбэке два параметра, первый req тут будет тело запроса с фронта, res - ответ который мы отправим на фронт. 
app.post('/generate-pdf', (req,res)=>{
    //  достаем поля из тела запроса
    const {chekidWork, squareData, ceilingHeight,totalPriceRub,totalUsdPrice} = req.body;
    
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

    //  отправляем на фронт файл пдф
    stream.on('finish', ()=> {
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

//  запускаем сервер на порту 
app.listen(3002, ()=>{
   
    console.log('Сервер запущен')
})