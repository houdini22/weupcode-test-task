import LocalStorageDB from 'localstoragedb'

const LocalStorage = new LocalStorageDB('library', localStorage)

if (LocalStorage.isNew()) {
    LocalStorage.createTable('books', ['kind', 'title', 'cover_thumb']);
    LocalStorage.commit()
}

export { LocalStorage }
export default { LocalStorage }
