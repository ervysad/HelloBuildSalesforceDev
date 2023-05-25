public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        // Validate read permission before SOQL query for security
        if (Schema.sObjectType.Contact.isAccessible()) {
            return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact];
        }
        return new List<Contact>(); // Return an empty list if read permission is not granted
    }
}
