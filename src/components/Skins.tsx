import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSetSkin } from '../redux/actions/userActions';
import { skinBorderStyleType } from '../redux/types';
import { useTypedSelector } from '../redux/useTypedSelector';
import { renderImage } from './Lobby/Lobby';

const skinColorArray = [
  'bg-red-300',
  'bg-red-600',
  'bg-red-900',
  'bg-yellow-300',
  'bg-yellow-600',
  'bg-yellow-900',
  'bg-green-300',
  'bg-green-600',
  'bg-green-900',
  'bg-blue-300',
  'bg-blue-600',
  'bg-blue-900',
  'bg-indigo-300',
  'bg-indigo-600',
  'bg-indigo-900',
  'bg-purple-300',
  'bg-purple-600',
  'bg-purple-900',
  'bg-pink-300',
  'bg-pink-600',
  'bg-pink-900'
];
const skinBorderColorArray = [
  'border-red-300',
  'border-red-600',
  'border-red-900',
  'border-yellow-300',
  'border-yellow-600',
  'border-yellow-900',
  'border-green-300',
  'border-green-600',
  'border-green-900',
  'border-blue-300',
  'border-blue-600',
  'border-blue-900',
  'border-indigo-300',
  'border-indigo-600',
  'border-indigo-900',
  'border-purple-300',
  'border-purple-600',
  'border-purple-900',
  'border-pink-300',
  'border-pink-600',
  'border-pink-900'
];
const skinBorderStyleArray = ['solid', 'dashed', 'dotted', 'double'];

function Skins() {
  const [skinColor, setSkinColor] = useState<string>('bg-red-300');
  const [skinBorder, setSkinBorder] = useState<boolean>(false);
  const [skinBorderColor, setSkinBorderColor] = useState<string>('border-red-300');
  const [skinBorderStyle, setSkinBorderStyle] = useState<skinBorderStyleType>('solid');
  const [skinBorderWidth, setSkinBorderWidth] = useState<number>(1);
  const user = useTypedSelector((state) => state.user);

  const dispatch = useDispatch();

  const skinOptions = user.skinOptions;

  const confirmSkin = () => {
    localStorage.setItem('skin-color', skinColor);
    localStorage.setItem('skin-border-color', skinBorderColor);
    localStorage.setItem('skin-border-style', skinBorderColor);
    localStorage.setItem('skin-border-width', String(skinBorderWidth));
    localStorage.setItem('skin-border', String(skinBorder));
    dispatch(
      userSetSkin({ skin: 'standard', skinBorder, skinBorderColor, skinBorderStyle, skinBorderWidth, skinColor })
    );
  };

  const showBorder = skinOptions.skinBorder
    ? `${skinOptions.skinBorderColor} border-${skinOptions.skinBorderStyle}`
    : '';

  return (
    <div className="panelWidth h-full my-0 mx-auto">
      <div className="bg-gray-300 hover:bg-gray-200 w-full flex items-center justify-center gap-x-2 mx-auto p-4 rounded-md">
        {renderImage(user.avatar)}
        <p className="font-bold">{user.nickname}</p>
        <div
          className={`${skinOptions.skinColor} ${showBorder} w-8 h-8`}
          style={{ borderWidth: skinOptions.skinBorder ? skinOptions.skinBorderWidth : 0 }}
        ></div>
      </div>
      <div className="bg-gray-100 w-full rounded-md px-4 py-4 overflow-auto" style={{ height: 'calc(100% - 112px)' }}>
        <div className="w-full flex justify-center items-center gap-x-2">
          <button
            className={`button ${skinBorder === true ? 'button-green' : 'button-red'}`}
            onClick={() => {
              setSkinBorder(!skinBorder);
            }}
          >
            Toggle border
          </button>
          <button className="button button-yellow" onClick={() => confirmSkin()}>Confirm</button>
        </div>
        <p className="text-lg font-bold mt-4 text-center">Main color</p>
        <div className="w-full flex flex-wrap gap-4 mt-2">
          {skinColorArray.map((color) =>
            renderSkinColors(color, skinBorder, skinBorderColor, skinBorderStyle, skinBorderWidth, setSkinColor)
          )}
        </div>
        {renderBorder(
          skinColor,
          skinBorder,
          skinBorderColor,
          skinBorderStyle,
          skinBorderWidth,
          setSkinBorderColor,
          setSkinBorderStyle,
          setSkinBorderWidth
        )}
      </div>
    </div>
  );
}

export default Skins;

type renderSkinType = (
  color: string,
  border: boolean,
  borderColor: string,
  borderStyle: skinBorderStyleType,
  borderWidth: number,
  [key]: any
) => JSX.Element;

const renderSkinColors: renderSkinType = (color, border, borderColor, borderStyle, borderWidth, setSkinColor) => {
  const showBorder = border ? `${borderColor} border-${borderStyle}` : '';
  return (
    <button
      className={`${color} w-8 h-8 ${showBorder} focus:animate-pulse`}
      style={{ borderWidth: border ? borderWidth : 0 }}
      key={`skin-color-${color}`}
      onClick={() => {
        setSkinColor(color);
      }}
    ></button>
  );
};

const renderSkinBorderColors: renderSkinType = (
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderColor
) => {
  return (
    <button
      className={`${color} ${borderColor} border-${borderStyle} w-8 h-8 focus:animate-pulse`}
      style={{ borderWidth: borderWidth }}
      key={`skin-border-color-${borderColor}`}
      onClick={() => {
        setSkinBorderColor(borderColor);
      }}
    ></button>
  );
};

const renderSkinBorderStyle: renderSkinType = (
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderStyle
) => {
  return (
    <button
      className={`${color} ${borderColor} border-${borderStyle} w-8 h-8 focus:animate-pulse`}
      style={{ borderWidth: borderWidth }}
      key={`skin-border-style-${borderStyle}`}
      onClick={() => {
        setSkinBorderStyle(borderStyle);
      }}
    ></button>
  );
};

const renderSkinBorderWidth: renderSkinType = (
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderWidth
) => {
  let buttons: JSX.Element[] = [];
  for (let index = 1; index < 17; index++) {
    buttons.push(
      <button
        className={`${color} ${borderColor} border-${borderStyle} w-8 h-8 focus:animate-pulse`}
        style={{ borderWidth: index }}
        key={`skin-border-width-${index}`}
        onClick={() => {
          setSkinBorderWidth(index);
        }}
      ></button>
    );
  }
  return <div className="w-full flex flex-wrap gap-4 mt-2">{buttons}</div>;
};

type renderBorderType = (
  skinColor: string,
  skinBorder: boolean,
  skinBorderColor: string,
  skinBorderStyle: skinBorderStyleType,
  skinBorderWidth: number,
  setSkinBorderColor: React.Dispatch<React.SetStateAction<string>>,
  setSkinBorderStyle: React.Dispatch<React.SetStateAction<skinBorderStyleType>>,
  setSkinBorderWidth: React.Dispatch<React.SetStateAction<number>>
) => JSX.Element;

const renderBorder: renderBorderType = (
  skinColor,
  skinBorder,
  skinBorderColor,
  skinBorderStyle,
  skinBorderWidth,
  setSkinBorderColor,
  setSkinBorderStyle,
  setSkinBorderWidth
) => {
  if (skinBorder === false) {
    return <></>;
  }
  return (
    <div className="w-full">
      <p className="text-lg font-bold text-center mt-4">Border color</p>
      <div className="w-full flex flex-wrap gap-4 mt-2">
        {skinBorderColorArray.map((borderColor) =>
          renderSkinBorderColors(
            skinColor,
            skinBorder,
            borderColor,
            skinBorderStyle,
            skinBorderWidth,
            setSkinBorderColor
          )
        )}
      </div>
      <p className="text-lg font-bold text-center mt-4">Border style</p>
      <div className="w-full flex flex-wrap gap-4 mt-2">
        {skinBorderStyleArray.map((borderStyle) =>
          renderSkinBorderStyle(
            skinColor,
            skinBorder,
            skinBorderColor,
            borderStyle as skinBorderStyleType,
            skinBorderWidth,
            setSkinBorderStyle
          )
        )}
      </div>
      <p className="text-lg font-bold text-center mt-4">Border width</p>
      {renderSkinBorderWidth(
        skinColor,
        skinBorder,
        skinBorderColor,
        skinBorderStyle,
        skinBorderWidth,
        setSkinBorderWidth
      )}
    </div>
  );
};
