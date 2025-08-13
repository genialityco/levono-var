import { IMAGES } from '../constants/assets';
import './footerSponsors.css';

export default function FooterSponsors(){
  return (
    <div className="screen2__footer">
      <img src={IMAGES.logosfooter} alt="AMD, Lenovo y Windows 11" />
    </div>
  );
}
