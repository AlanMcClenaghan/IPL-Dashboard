import { LightningElement, wire } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader'
import fetchCricketData from '@salesforce/apex/IplController.fetchCricketData'
import IPL_Winners from '@salesforce/resourceUrl/IPL_Winners'
import iplGlobalStyle from '@salesforce/resourceUrl/iplGlobalStyle'
export default class IplBanner extends LightningElement {

    fileName='ipl2024stats.json'
    carouselList=[]
    

    @wire(fetchCricketData, {
        fileName:'$fileName'
    })ipl2023StatsHandler({data, error}){
        if(data){
            console.log("ipl2023StatsHandler data", data)
        }
        if(error){
            console.error("ipl2023StatsHandler error", error);
        }
    }


    connectedCallback(){
        this.onloadStyleMethod()
        this.generateCarouselList()
    }
        
    onloadStyleMethod(){
        loadStyle(this, iplGlobalStyle).then(()=>{
            console.log("iplGlobalStyle loaded")
        }).catch(error=>{
            console.error("iplGlobalStyle error", error)
        })
    }


    generateCarouselList(){
        for(let i = 2008; i<2024; i++){
            let url = `${IPL_Winners}/IPL_Winners/${i}.png`
            let year = i
            let altText = `Winners of season ${i}`
            this.carouselList.push({url, year, altText})
        }
    }

}