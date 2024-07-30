import { useState } from 'react'
import { View} from 'react-native';
import AppView from '@/components/AppView';
import StepContainer from '@/components/StepContainer';
import Option from '@/components/Steps/Option';
import { steps } from '@/assets/Plans'
const totalSteps = steps.length


export default function HomeScreen() {
  const [step, setStep] = useState(0)
  const currentStep = steps[step]
  return (
    <AppView>
      <StepContainer currentStep={currentStep} step={step} totalSteps={totalSteps} showWarning={'warning'} onStepBack={() => setStep(prev => prev !== 0 ? prev - 1 : 0)}>
        <View>
        {currentStep.options?.map(option => (
            <Option 
              key={option.title} 
              option={option} 
              long 
              // onSelect={() => console.log('selected')}
              onSelect={() => setStep(prev => prev + 1)}
              // prevData={answers[currentStep.value]} 
              // onSelect={(data) => selectOptionHandler(data)} 
              // onCheck={(val) => selectOptionHandler(val, option.value)} 
              />
        ))}
        </View>
      </StepContainer>
    </AppView>
  );
}
