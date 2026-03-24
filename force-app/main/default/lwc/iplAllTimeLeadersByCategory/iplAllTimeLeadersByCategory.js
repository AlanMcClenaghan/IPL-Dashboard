import { LightningElement, wire } from 'lwc';
import {subscribe, MessageContext, unsubscribe, APPLICATION_SCOPE} from 'lightning/messageService';
import MSG_SERVICE from '@salesforce/messageChannel/Record_Selected__c'
import fetchCricketData from '@salesforce/apex/IplController.fetchCricketData'
import IPL_Images_and_logos from '@salesforce/resourceUrl/IPL_Images_and_logos'

export default class IplAllTimeLeadersByCategory extends LightningElement {

    heading
    fileName
    subscription
    records =[]

    @wire(MessageContext)
    messageContext

    @wire(fetchCricketData, {
        fileName:'$fileName'
    })leadersByCatgeoryHandler({data, error}){
        if(data){
            console.log("leadersByCatgeoryHandler data", data)
            let parsedData = JSON.parse(data)
            this.records = parsedData.map((item, index)=>{
                let player_image = `${IPL_Images_and_logos}/IPL_Images_and_logos/${item.StrikerName?.replaceAll(' ', '')}.png`
                return {...item, pos:index+1, player_image}
            })
        }
        if(error){
            console.error("leadersByCatgeoryHandler error", error)
        }
    }

    errorHandler(event){
        event.target.src = `${IPL_Images_and_logos}/IPL_Images_and_logos/default.png`
    }

    get showWickets(){
        return this.fileName === "MostWickets.json"
    }

    get showRuns(){
        return this.fileName !== "MostWickets.json"
    }

    connectedCallback(){
        this.subscribeToMessageChannel()
    }

    subscribeToMessageChannel() {
        // subscribe(messageContext, messageChannel, listener, subscriberOptions)
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MSG_SERVICE,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleMessage(message) {
        console.log("Message", message)
        this.heading = `TOP 5 ${message.fileName.title} OF ALL TIME`
        this.fileName = message.fileName.name+'.json'
    }

    disconnectedCallback() {
        // unsubscribe(subscription)
        unsubscribe(this.subscription)
        this.subscription = null
    }

}