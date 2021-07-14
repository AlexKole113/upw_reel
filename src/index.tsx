import ReactDOM from 'react-dom';
import App from './components/App'

declare const window: any;
window.EMBED_REEL_PATH = 'https://condescending-curran-bf301a.netlify.app';

const CSS_URL   =  window.EMBED_REEL_PATH + `/dist/assets/css/main.css`;
// TODO: Change SRC Arrow and Spinner Images !


// create root
const root = document.createElement('div');
root.setAttribute('id','upw-reel-root' );
if( !window.REEL_MAP ){
    window.REEL_MAP = {
        "settings": [
            {
                "slot": 3,
                "gameType": "slotMachine",
                "color": "#03b3ef",
                "name": "5%",
                "textColor": "#ffffff",
                "coupon": "5CODE"
            },
            {
                "slot": 3,
                "name": "10%",
                "textColor": "#ffffff",
                "coupon": "10CODE",
                "gameType": "slotMachine",
                "color": "#ff7a1f"
            },
            {
                "gameType": "slotMachine",
                "slot": 3,
                "coupon": "15CODE",
                "textColor": "#ffffff",
                "name": "15%",
                "color": "#ee041d"
            },
            {
                "gameType": "slotMachine",
                "name": "5%",
                "color": "#f1954c",
                "slot": 3,
                "coupon": "25CODE",
                "textColor": "#ffffff"
            },
            {
                "coupon": "35CODE",
                "name": "5%",
                "textColor": "#ffffff",
                "gameType": "slotMachine",
                "slot": 3,
                "color": "#8bdcfe"
            }
        ],
    }
}

// styles
const link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('href', CSS_URL  );

document.head.append( link )
document.body.append( root )


if( root ) {
    ReactDOM.render(
        <App gameID={ '1' } />,
        document.querySelector('#upw-reel-root'),
    );
}



