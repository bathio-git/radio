class Radio {
    constructor( name, slogans, streams, radioUrl, id ) {
        this.name = name;
        this.slogan = slogans;
        //this.stream = `${process.env.NEXT_PUBLIC_API_URL}/api/8000?url=${streams}`;
        this.stream = streams;
        this.radioUrl = radioUrl;
        this.id = id;
    }
}

const antenas = new Radio(
    'antenas',
    'n10.as',
    'https://n10as.radiocult.fm/stream',
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
    'https://listen.studioraheem.it/radioraheem_a',
    'https://www.raheemexperience.com/',
    '8',
)

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


const dublab = new Radio(
    'dublab',
    'Future Roots Radio',
    'https://dublab.out.airtime.pro/dublab_a',
    'https://dublab.com/',
    '12',
)

const oroko = new Radio(
    'oroko',
    'Accra, Ghana',
    'https://s5.radio.co/s23b8ada46/listen',
    'https://oroko.live/',
    '13',
)

const slacks = new Radio(
    'slacks',
    'Tyne & Wear weird radio',
    'https://slacks.radiocult.fm/stream',
    'https://slacks.world/',
    '14',
)

const mutants = new Radio(
    'mutant',
    'Tbilisi, Georgia',
    'https://www.radioking.com/play/mutant-radioo',
    'https://www.mutantradio.net/',
    '15',
)

const fondation = new Radio(
    'fondation',
    'a progressive music platform',
    'https://streamer.radio.co/s0628bdd53/listen',
    'https://fondation.fm/',
    '16',
)

const subtle = new Radio(
    'subtle',
    'broadcasting from hackney, london',
    'https://subtle.out.airtime.pro/subtle_a?_=1',
    'https://subtleradio.com/',
    '17',
)

const voices = new Radio(
    'voices',
    'down in Coal Drops Yard',
    'https://voicesradio.out.airtime.pro/voicesradio_a',
    'https://voicesradio.org/',
    '18',
)


const radios = [
    antenas,
    /*balamii,*/
    cashmere,
    ckut,
    dublab,
    fondation,
    kiosk,
    /* lot, */
    /*mutants,*/
    nts,
    nts2,
    /*oroko,*/
    /* raheem, */
    /* rinsefr, */
    slacks,
    subtle,
    voices,
    worldwide,
]

export default radios;