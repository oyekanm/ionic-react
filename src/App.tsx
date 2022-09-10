import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import InputControls from "./components/InputControls";

const App: React.FC = () => {
  const weightRef = useRef<HTMLIonInputElement>(null);
  const heightRef = useRef<HTMLIonInputElement>(null);

  const [bmi, setBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnit, setCalcUnit] = useState<"m/kg" | "ft/lbs">("m/kg");

  const calculateBMI = () => {
    const weightValue = weightRef.current!.value!;
    const heightValue = heightRef.current!.value!;

    if (
      !weightValue ||
      !heightValue ||
      +weightValue <= 0 ||
      +heightValue <= 0
    ) {
      setError("Please enter a (non negative) input number");
      return;
    }

    const weightConverter = calcUnit === "ft/lbs" ? 2.2 : 1;
    const heightConverter = calcUnit === "ft/lbs" ? 3.37 : 1;

    const weight = +weightValue / weightConverter;
    const height = +heightValue / heightConverter;

    const bmi = weight / (height * height);

    setBmi(bmi);
  };

  const resetInputs = () => {
    weightRef.current!.value = "";
    heightRef.current!.value = "";
    setBmi(undefined);
  };
  const changeCalc = (selectedValue: "m/kg" | "ft/lbs") => {
    setCalcUnit(selectedValue);
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        onDidDismiss={() => setError("")}
        header="Hello!!"
        // subHeader="Important message"
        message={error}
        buttons={["Okay"]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonGrid>
            <InputControls
              selectedValue={calcUnit}
              onSelectedValue={changeCalc}
            />
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({calcUnit === "m/kg" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight ({calcUnit === "m/kg" ? "kg" : "lbs"})
                  </IonLabel>
                  <IonInput type="number" ref={weightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <BmiControls
            onResetInputs={resetInputs}
            onCalculateBMI={calculateBMI}
          />
          <IonGrid>{bmi && <BmiResult bmi={bmi} />}</IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
