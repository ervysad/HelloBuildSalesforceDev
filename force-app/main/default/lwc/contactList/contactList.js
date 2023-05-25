import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {
  @track contacts;
  @track error;
  @track isLoading = true;

  @wire(getContacts)
  wiredContacts({ error, data }) {
    this.isLoading = false; // Stop loading indicator when the info is retrieved

    if (data) {
      this.contacts = data;
      this.error = undefined;
    } else if (error) {
      this.error = 'Error retrieving contacts'; // Set error message
      console.error(error);
    }
  }
  
}