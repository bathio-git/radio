export default function HamburgerSlider ({ setLive, live }) {

    const handleToggle = () => {
        setLive(!live)
    }

    return (
        <div className="mt-0 lg:mt-4 flex ml-[10vw] md:ml-[20vw]">
            <label
                style={{ background: '#000'}}
                className=" w-[15rem] md:w-[30rem] h-[2.5rem] react-switch">
                <input
                    className="react-switch-checkbox"
                    onChange={handleToggle}
                    type="checkbox"
                    checked={live}
                />
                <div
                    className="react-switch-button w-[7.5rem] md:w-[15rem] h-[3rem] " />
                <div
                    className="react-switch-labels text-[1.25rem]">
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-broadcast " viewBox="0 0 16 16">
                        <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                    </svg>
                        &nbsp;
                        <p className="text-[#000] w-0 md:text-[#aaa] md:w-max	 ">
                            Live Streams
                        </p>
                    </span>
                    <span >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cassette " viewBox="0 0 16 16">
                        <path d="M4 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 6a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2H7Z"/>
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13ZM1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-.691l-1.362-2.724A.5.5 0 0 0 12 10H4a.5.5 0 0 0-.447.276L2.19 13H1.5a.5.5 0 0 1-.5-.5v-9ZM11.691 11l1 2H3.309l1-2h7.382Z"/>
                    </svg>
                        &nbsp;
                        <p className="text-[#000] w-0 md:text-[#aaa] md:w-max	">
                            Users Recordings
                        </p>
                    </span>
                </div>
            </label>
        </div>
    )
}
