import penImage from '../images/avatar-pencil.svg';
import avatarImage from '../images/kustojpg.jpg';

export default function Profile(props) {
  return (
    <section className='profile'>
      <div className='profile__container'>
        <div className='profile__avatar'>
          <img
            alt='avatar'
            src={props.avatarLink || avatarImage} // Используйте avatarLink из пропсов
            className='profile__image'
            onClick={props.onImageClick}
          />
          <div
            className='profile__overlay-icon'
            onClick={props.onImageClick}
          ></div>
        </div>
        <div className='profile__info'>
          <div className='name'>
            <h2 className='profile__name' id='name-active'>
              {props.profileName}
            </h2>
            <button
              className='profile__btn_edit'
              id='btnEdit'
              onClick={() =>
                props.onEditClick(props.profileName, props.profileDescription)
              }
            ></button>
          </div>
          <p className='discription' id='discription-active'>
            {props.profileDescription}
          </p>
        </div>
        <div className='profile__btn'>
          <button
            className='profile__btn_add'
            id='addBtn'
            onClick={props.onAddClick}
          ></button>
        </div>
      </div>
    </section>
  );
}
