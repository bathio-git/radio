class Radio {
    constructor( name, slogans, streams, radioUrl, id ) {
        this.name = name;
        this.slogan = slogans;
        this.stream = streams;
        this.radioUrl = radioUrl;
        this.id = id;
    }
}

const antenas = new Radio(
    'antenas',
    'n10.as',
    'https://n10as.out.airtime.pro/n10as_a',
    'https://n10.as/',
    '1',
)

const balamii = new Radio(
    'balamii',
    'Togetherness Through Music',
    'https://balamii.out.airtime.pro/balamii_a',
    'https://www.balamii.com/',
    '2',
)

const cashmere = new Radio(
    'cashmere',
    'Berlin-Wedding',
    'https://cashmereradio.out.airtime.pro/cashmereradio_b',
    'https://cashmereradio.com/',
    '3',
)

const ckut = new Radio(
    'ckut',
    'Montreal Campus Community Radio',
    'https://ckut.out.airtime.pro/ckut_a',
    'https://ckut.ca/en',
    '4',
)

const kiosk = new Radio(
    'kiosk',
    'Parc Royal, Bruxelles',
    'https://kioskradiobxl.out.airtime.pro/kioskradiobxl_b',
    'https://kioskradio.com/',
    '5',
)

const lot = new Radio(
    'lot',
    'Nassau Ave, Brooklyn',
    'https://cdn.livepeer.com/hls/3612a961j4sy3l7q/index.m3u8?video=false',
    'https://www.thelotradio.com/',
    '6',
)

const nts = new Radio(
    'nts',
    'Live on 1',
    'https://stream-relay-geo.ntslive.net/stream',
    'https://www.nts.live/1',
    '7',
)

const nts2 = new Radio(
    'nts2',
    'Live on 2',
    'https://stream-relay-geo.ntslive.net/stream2',
    'https://www.nts.live/2',
    '7'
)

const raheem = new Radio(
    'raheem',
    'Triennale di Milano',
    'https://streams.radio.co/s63f12ebcb/listen',
    'https://www.raheemexperience.com/',
    '8',
)
9
const rinsefr = new Radio(
    'rinsefr',
    'verrouillé',
    'https://stream-relay-geo.rinse.fr/rinsefr.mp3',
    'https://rinse.fr/',
    '9',
)

const worldwide = new Radio(
    'worldwide',
    'join family',
    'https://worldwidefm.out.airtime.pro/worldwidefm_a',
    'https://worldwidefm.net/',
    '10',
)

const radios = [
    antenas,
    balamii,
    cashmere,
    ckut,
    kiosk,
    /* lot, */
    nts,
    nts2,
    /* raheem,
    rinsefr, */
    worldwide,
]

export default radios;