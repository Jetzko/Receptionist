// Deve essere un input di testo dove scrivere il nickname dell'utente che si vuole nominare come admin. Una volta che ci si ferma dallo scrivere c'è un delay di 2 secondi e il nickname viene mandato al server che ne controlla l'esistenza, solo dopo che il nuckname è verificato, si può confermare la nomina. Ogni admin deve comparire come etichetta sopra la barra di input con un piccolo pulsante per eliminare l'utente dalla lista

import Input from '../../reusable/Input';

function SearchAdmins() {
  return (
    <div>
      {/* Select di ruolo */}
      <Input type='select' id='role-selector'>
        <option value='admin'>Admin</option>
        <option value='collaborator'>Collaborator</option>
      </Input>
      {/* Input per il nickname */}
      <Input type='text' id='user-searchbar' />
      {/* Pulsante di conferma */}
      {/* Lista di nicknameTags con buttonDelete (x) */}
      <ul></ul>
    </div>
  );
}

export default SearchAdmins;
