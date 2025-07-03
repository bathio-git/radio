export default function SavingAnimation ()  {
    return (
        <>
            <div className="lds-fade-dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <style jsx>{`
                .lds-fade-dots {
                    display: inline-block;
                    position: relative;
                    width: 80px;
                    height: 35px;
                }
                .lds-fade-dots div {
                    position: absolute;
                    top: 100%;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #aaa;
                    opacity: 0.3;
                    animation: lds-fade 1.2s linear infinite;
                }
                .lds-fade-dots div:nth-child(1) {
                    left: 8px;
                    animation-delay: 0s;
                }
                .lds-fade-dots div:nth-child(2) {
                    left: 26px;
                    animation-delay: 0.2s;
                }
                .lds-fade-dots div:nth-child(3) {
                    left: 44px;
                    animation-delay: 0.4s;
                }
                .lds-fade-dots div:nth-child(4) {
                    left: 62px;
                    animation-delay: 0.6s;
                }
                @keyframes lds-fade {
                    0%, 100% {
                        opacity: 0.3;
                        background: #aaa;
                    }
                    50% {
                        opacity: 1;
                        background: #888;
                    }
                }
            `}</style>
        </>
    )
}