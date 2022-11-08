import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import styles from "./styles";
import { Subscription } from 'expo-media-library';

export default function Pedometro() {
    const [currentStepCount, setCurrentStepCount ] = useState(0)
    const [isPedometerAvailable, setIsPedometerAvailable ] = useState('checking')
    const [pastsStepCount, setPastsStepCount] = useState (0)
    let [ subscription, setSubscription] = useState<Subscription | null>(null);

    useEffect(() => {
        async function permission() {
            console.log(await Pedometer.requestPermissionsAsync())
            console.log(await Pedometer.getPermissionsAsync())
        }
        permission()
        _susbscribe();
        return () => _unsubscribe();
    }, []);

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const _susbscribe = () => {
        subscription = Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps)
        });

        Pedometer.isAvailableAsync().then(
            result => {
                setIsPedometerAvailable(String(result));
            },
            error => {
                setIsPedometerAvailable('Nõa rolou' + error);
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                setPastsStepCount(result.steps);
            },
            error => {
                console.log('Não rolou' + error);
            }
        );
    };

    return (
        <View style={styles.container}>
            <Text>Pedometer.isAvailableAsyn(): {isPedometerAvailable}</Text>
            <Text>Steps taken in the last 24hours: {pastsStepCount}</Text>
            <Text>Walk! And watch this go up: {currentStepCount}</Text>
        </View>
    );
}