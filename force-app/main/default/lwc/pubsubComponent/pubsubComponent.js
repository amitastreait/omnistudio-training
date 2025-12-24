import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import pubsub from 'omnistudio/pubsub'
export default class PubsubComponent extends OmniscriptBaseMixin(LightningElement) {

    stepName;

    renderedCallback(){
        pubsub.register('omniscript_action', {
            data: this.handleOmniscriptAction.bind(this),
        });
        pubsub.register('omniscript_step', {
            data: this.handleOmniscriptStep.bind(this),
        });
    }

    handleOmniscriptStep(data){
        console.log('omniscript_step', JSON.stringify(data));
        this.stepName = JSON.stringify(data);
    }

    handleOmniscriptAction(data){
        console.log('omniscript_action', JSON.stringify(data));
    }
}