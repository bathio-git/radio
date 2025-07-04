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
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #aaa;
                    opacity: 0.3;
                    animation: lds-fade 1.8s linear infinite;
                }
                .lds-fade-dots div:nth-child(1) {
                    left: 8px;
                    top: 1.5rem;
                    animation-delay: 0s;
                }
                .lds-fade-dots div:nth-child(2) {
                    top: 1.5rem;
                    left: 26px;
                    animation-delay: 0.2s;
                }
                .lds-fade-dots div:nth-child(3) {
                    top: 1.5rem;
                    left: 44px;
                    animation-delay: 0.4s;
                }
                .lds-fade-dots div:nth-child(4) {
                    top: 1.5rem;
                    left: 62px;
                    animation-delay: 0.6s;
                }
                @keyframes lds-fade {
                    0%, 100% {
                        opacity: 1;
                        background: #aaa;
                    }
                    50% {
                        opacity: 0;
                        background: #888;
                    }
                }
            `}</style>
        </>
    )
}