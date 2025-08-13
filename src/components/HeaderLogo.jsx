import { IMAGES } from '../constants/assets';
import './headerLogo.css';

export default function HeaderLogo() {
  return (
    <header className="screen2__header">
      <img src={IMAGES.logoPlayCheck} alt="Lenovo PlayCheck Desk" />
    </header>
  );
}
