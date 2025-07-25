import {create} from 'zustand'
import { Tabs } from './tabs.interface'
// табы 
const useTabs = create<Tabs>((set)=> ({
    tabIndex: 0,
    changeActive: (index)=>{
        set(() => ({
            tabIndex: index
        }))
    }
}))
export default useTabs