// набор классов и селекторов для валидации форм
const configSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

// селектор шаблона карточки
const templateSelector = '#element-template';

// селектор контейнера с карточками
const cardContainerSelector = '.elements__list';

// селекторы попапов
const editPopupSelector = '.popup_edit';
const addPopupSelector = '.popup_add';
const picturePopupSelector = '.popup_picture';
const updateAvatarPopupSelector = '.popup_avatar-update';
const confirmPopupSelector = '.popup_confirm';

// кнопки редактирования профиля и добавления карточек
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// элементы имени и описания в профиле
const userName = document.querySelector('.profile__name');
const userBio = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__avatar');
const avatarOverlay = document.querySelector('.profile__avatar-overlay');

// формы и поля ввода
const formList = document.querySelectorAll('.popup__form');
const editForm = document.querySelector('.popup__form_type_edit');
const nameField = document.querySelector('#name');
const bioField = document.querySelector('#about');
const addForm = document.querySelector('.popup__form_type_add');
const updateForm = document.querySelector('.popup__form_type_avatar-update');

export { configSet, templateSelector, cardContainerSelector,
  editPopupSelector, addPopupSelector, picturePopupSelector,
  confirmPopupSelector, updateAvatarPopupSelector, editButton,
  addButton, formList, editForm, nameField, bioField, addForm,
  updateForm, userName, userBio, userAvatar, avatarOverlay }
