@isTest
private class ContactControllerTest {
    @isTest
    static void testGetContacts() {
        // Call getContacts initially and save the size
        Test.startTest();
        Integer initialSize = ContactController.getContacts().size();
        

        // Create test contacts
        List<Contact> testContacts = new List<Contact>();
        testContacts.add(new Contact(FirstName = 'Carlos', LastName = 'Ramos', Email = 'carlosramos@example.com'));
        testContacts.add(new Contact(FirstName = 'Diana', LastName = 'Perez', Email = 'dianaperez@example.com'));
        insert testContacts;

        // Call getContacts again and verify the size
        
        List<Contact> contactsAfterInsert = ContactController.getContacts();
        Test.stopTest();

        Integer expectedSize = initialSize + testContacts.size();
        System.assertEquals(expectedSize, contactsAfterInsert.size(), 'Number of contacts should match after insertion');

        // Compare the email of the last record
        Contact lastInsertedContact = testContacts[testContacts.size() - 1];
        Contact lastRetrievedContact = contactsAfterInsert[contactsAfterInsert.size() - 1];
        System.assertEquals(lastInsertedContact.Email, lastRetrievedContact.Email, 'Last contact email should match');
    }
}