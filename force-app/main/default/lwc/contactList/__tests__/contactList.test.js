import { createElement } from 'lwc';
import { createTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import ContactList from 'c/contactList';
import getContacts from '@salesforce/apex/ContactController.getContacts';

// Create the wire adapter
const getContactsAdapter = createTestWireAdapter(getContacts);

describe('c-contact-list', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it('renders contact data correctly', async () => {
    // Mock the contact data
    const mockContacts = [
      {
        Id: '001',
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'johndoe@example.com'
      },
      {
        Id: '002',
        FirstName: 'Jane',
        LastName: 'Smith',
        Email: 'janesmith@example.com'
      }
    ];
    getContactsAdapter.emit(mockContacts);

    // Create a new instance of the ContactList component
    const element = await createElement('c-contact-list', {
      is: ContactList
    });
    document.body.appendChild(element);

    // Perform assertions to verify the expected rendering
    const tableRows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(mockContacts.length);

    tableRows.forEach((row, index) => {
      const columns = row.querySelectorAll('td');
      expect(columns[0].textContent).toBe(mockContacts[index].FirstName);
      expect(columns[1].textContent).toBe(mockContacts[index].LastName);
      expect(columns[2].textContent).toBe(mockContacts[index].Email);
    });
  });
});
