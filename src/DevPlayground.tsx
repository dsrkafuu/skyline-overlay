import clsx from "clsx";
import { useState } from "react";
import "./DevPlayground.scss";
import Housing from "./assets/images/dev/housing.png";
import Lunar from "./assets/images/dev/lunar.png";
import Maps from "./assets/images/dev/maps.png";
import {getLS, setLS} from "./utils/storage";

interface DevAppProps {
  children: React.ReactElement,
}

export default function DevPlayground({children}: DevAppProps) {
  const [panelVisible, setPanelVisible] = useState(false);

  // We could probably use a localStorage hook here, but we'll just use what we have for now
  const [backgroundColor, setBackgroundColor] = useState(getLS('skyline-dev-playground-background-color') as string || '#FFFFFF');
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(getLS('skyline-dev-playground-background-image') as string || 'None');

  const setPlaygroundValue = (setter: (value: string) => void, value: string, key: string) => {
    setter(value);
    setLS(`skyline-dev-playground-${key}`, value);
  }

  const backgroundImages: {[k: string]: string | undefined} = {Housing, Lunar, Maps, None: undefined}

  const settings = (
    <div className="playground-panel-content">
      <div className="playground-panel-content-control">
        Background image: <select onChange={(e) => setPlaygroundValue(setBackgroundImage, e.target.value, 'background-image')}>
          {Object.keys(backgroundImages).map(image => (
            <option value={image} selected={image === backgroundImage}>{image}</option>
          ))}
        </select>
      </div>
      
      <div className="playground-panel-content-control">
        Background color: <input type="text" value={backgroundColor} onChange={(e) => setPlaygroundValue(setBackgroundColor, e.target.value, 'background-color')} />
      </div>
    </div>
  );
  
  const style = {
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImages[backgroundImage]})` : undefined,
  }

  console.log(style);

  return (
    <div className="playground" style={style}>
      <div className="playground-children">
        {children}
      </div>
      <div className={clsx("playground-panel", !panelVisible && "playground-panel--hidden")}>
        <div 
          className="playground-panel-toggle" 
          onClick={() => setPanelVisible(!panelVisible)}
        >
          Settings
        </div>

        {settings}
      </div>
    </div>
  )
}
