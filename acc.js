#ACC>JSUPDATION#

import { LightningElement } from 'lwc';
import AccountObject from '@salesforce/schema/Account';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LDSCreateMethodForAccount extends LightningElement {
    accountName = '';
    accountRating = '';
    accountIndustry = '';

    handleChange(event) {
        const label = event.target.label;
        const value = event.target.value;

        if (label === 'Enter Account Name') {
            this.accountName = value;
        } else if (label === 'Enter Account Rating') {
            this.accountRating = value;
        } else if (label === 'Enter Account Industry') {
            this.accountIndustry = value;
        }
    }

    handleClick() {
        const fields = {
            Name: this.accountName,
            Rating: this.accountRating,
            Industry: this.accountIndustry
        };

        const userInputs = {
            apiName: AccountObject.objectApiName,
            fields: fields
        };

        createRecord(userInputs)
            .then(account => {
                console.log('Record has been created successfully with Record Id:', account.id);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: `Your record has been created successfully. Record Id: ${account.id}`,
                        variant: 'success'
                    })
                );

                this.clearInputs();
            })
            .catch(error => {
                console.error('An error occurred while creating the record:', error);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An error occurred while creating the record. Check the console for details.',
                        variant: 'error'
                    })
                );
            });
    }

    clearInputs() {
        this.accountName = '';
        this.accountRating = '';
        this.accountIndustry = '';
    }
}
