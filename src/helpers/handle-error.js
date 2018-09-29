import PubSub from 'pubsub-js';

export default class HandleError {

    publishError = (errorArr) => {
        for (let i = 0; i < errorArr.length; i++) {
            PubSub.publish('error:validation', errorArr[i]);
        }
    }

}