import { LightningElement, wire } from 'lwc';
import fetchCricketData from '@salesforce/apex/IplController.fetchCricketData'
export default class IplBanner extends LightningElement {

    fileName='ipl2024stats.json'
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
}