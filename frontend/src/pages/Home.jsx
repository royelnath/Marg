import image1 from '../assets/Home.png';
import engineer from '../assets/enginee logo.png';
import doctor from '../assets/doctor logo.png';
import scientist from '../assets/scientist logo.png';

export default function Home(){
    return(
        <>
        <div className='Home'>
            <span className='quote1'>
                <h1 className="quote">Clarity precedes success</h1>
                <p className="desc">Discover your exact career trajectory. Take our precision-based assessment to map your unique skills to real-world industry demands, and build a definitive roadmap for your future.</p>
            </span>
            <span>
                <img className='image1' src={image1} alt="Image1" />
            </span>
        </div>
        <div className='popular'>
            <p>Popular Careers</p>
            <div className='options'>
                <span><a href="https://en.wikipedia.org/wiki/Engineer" target='_blank'><img src={engineer} alt="Engineer" width='50px'/> Engineer</a></span>
                <span><a href="https://en.wikipedia.org/wiki/Medical_doctor" target='_blank'><img src={doctor} alt="Doctor" width='50px'/> Doctor</a></span>
                <span><a href="https://en.wikipedia.org/wiki/Scientist" target='_blank'><img src={scientist} alt="Scientist" width='50px'/> Scientist</a></span>
            </div>
        </div>
        </>
    )
}