import React from "react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";

const BmiControls: React.FC<{
  onCalculateBMI: () => void;
  onResetInputs: () => void;
}> = (props) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonButton onClick={props.onCalculateBMI}>
            <IonIcon slot="start" icon={calculatorOutline} />
            Calculate
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={props.onResetInputs}>
            <IonIcon slot="start" icon={refreshOutline} />
            Reset
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default BmiControls;
