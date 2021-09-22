import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Cross from '../../../icons/cross';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import { renderImage } from '../Lobby';

const users = [
  {
    nickname: 'akakafthjnmkmjnbgtfvbhnj',
    avatar: 'asdfasdf'
  },
  {
    nickname: 'akakadfnghtgnf',
    avatar: 'asdfasdf'
  },
  {
    nickname: 'akaka',
    avatar: 'asdfasdf'
  },
  {
    nickname: 'akakafgndne',
    avatar: 'asdfasdf'
  },
  {
    nickname: 'akaka',
    avatar: 'asdfasdf'
  },
  {
    nickname: 'akakafgndne',
    avatar: 'asdfasdf'
  },
  {
    nickname: 'akakardgbhjknbgyfcdrtfvhjnmhugvtfrtghjimnbgyfctvbhjmnhgyvtfghjimkjinbgtfgyhnj',
    avatar: 'asdfasdf'
  }
];

function LobbyOptPlayers() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  return (
    <>
      <p className="text-lg my-1">{t('PLAYERS') + ' ' + lobby.inLobbyPlayers + '/' + lobby.maxPlayers}</p>
      <div className="w-full px-2">
        <div className="flex items-center">
          <p>{t('L_MAX_PLAYERS')}</p>
          <input type="text" pattern="[0-9]" maxLength={2} className="ml-2 lobbyOptInput" value={lobby.maxPlayers} />
        </div>
        <div className="bg-white p-2 rounded-md text-black max-h-48 lg:max-h-96 overflow-y-auto mt-2">
          {users.map((user) => {
            return (
              <div className="flex items-center p-2 my-2 w-min hover:bg-gray-200 rounded-md">
                {renderImage(user.avatar)} <p className="ml-2">{user.nickname.substr(0, 24)}</p>{' '}
                <button className="w-8 h-8 ml-2 fill-current bg-gray-300 text-gray-500 hover:text-red-600 hover:bg-red-200 p-1.5 rounded-full">
                  <Cross />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default LobbyOptPlayers;