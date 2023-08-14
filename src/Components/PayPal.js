export default function PayPal() {
    
    function openPayPalDonation () {
        
        const PAYPAL_URL = 'https://www.paypal.com/cgi-bin/webscr';
        const queryParameters = {
            cmd: '_donations',
            business: 'ecrire@bathio.xyz',
            item_name: 'Donation',
            currency_code: 'USD',
        };
        const queryString = new URLSearchParams(queryParameters).toString();
        window.open(`${PAYPAL_URL}?${queryString}`, '_blank');
    };

    return (
        <button onClick={openPayPalDonation}>
            (ﾉ^_^)
        </button>
    )
}