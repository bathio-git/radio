export default function HamburgerSlider ({ setLive, live }) {

    const handleToggle = () => {
        setLive(!live)
    }

    return (
        <div className="mt-4 flex justify-center">
            <label
                style={{ background: '#000'}}
                className=" w-[28rem] h-[2.5rem] react-switch">
                <input
                    className="react-switch-checkbox"
                    onChange={handleToggle}
                    type="checkbox"
                    checked={live}
                />
                <div
                    className="react-switch-button w-[14rem] h-[3rem] " />
                <div
                    className="react-switch-labels text-[1.25rem]">
                    <span>Live Streams</span>
                    <span >Users Recordings</span>
                </div>
            </label>
        </div>
    )
}