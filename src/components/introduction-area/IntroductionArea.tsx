import { IonButton, IonIcon } from "@ionic/react";
import "./IntroductionArea.scss";

export interface IntroductionButtons {
  text: string;
  iosIcon: string;
  mdIcon: string;
  color?: string;
  link?: string;
}

export interface ContainerProps {
  topTitle?: string;
  name: string;
  subtitle: string;
  description: string;
  buttons: IntroductionButtons[];
}

const defaultProps: any = {
  topTitle: "Hi, my name is",
};

const IntroductionArea: React.FC<ContainerProps> = (props) => {
  return (
    <div className="introduction-container">
      <div className="spacing" />
      <h3>{props.topTitle}</h3>
      <h1>
        <strong>{props.name}</strong>
      </h1>
      <h2>{props.subtitle}</h2>

      <div className="description">
        <p>{props.description}</p>
      </div>

      {props.buttons.map((button, index) => (
        <IonButton
          key={index}
          color={button.color ?? "primary"}
          fill="outline"
          href={button.link ?? "#"}
          target="_blank"
          rel="noreferrer"
          style={{
            paddingRight: props.buttons.length - 1 !== index ? "10px" : "0px",
          }}
        >
          <IonIcon slot="start" ios={button.iosIcon} md={button.mdIcon} />
          {button.text}
        </IonButton>
      ))}
    </div>
  );
};
IntroductionArea.defaultProps = defaultProps;

export default IntroductionArea;
