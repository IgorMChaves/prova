import { View } from 'react-native';
import { Audio, Video, AVPlaybackStatus } from 'expo-av';
import { useEffect, useRef, useState } from 'react'
import { ButtonComp } from '../../components'
import styles from './styles'

export default function App() {
    const video = useRef(null);
    const [status, setStatus] = useState({} as AVPlaybackStatus)

    const [recording, setRecording] = useState<AVPlaybackStatus>()
    const [sound, setSound] = useState();
    const [soundUri, setSoundUri] = useState(null);

    async function playSound() {
        console.log('Carregando som')
        const { sound } = await Audio.Sound.createAsync({ uri: soundUri })
        setSound(sound)
        console.log('Tocando som')
        await sound.playAsync()
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function startRecording() {
        try {
            console.log('Requisitando permissões..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Iniciando gravação..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Gravação iniciada');
        } catch (err) {
            console.error('Erro ao iniciar gravação', err);
        }
    }

    async function stopRecording() {
        console.log('Parando gravação..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setSoundUri(uri);
        console.log('Gravação encerrada e salva em', uri);
    }

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.buttons}>
                <ButtonComp
                    type='primary'
                    title={status.isPlaying ? 'Pausar' : 'Play'}
                    onPress={() =>
                        status.isPlaying ?
                            video.current.pauseAsync() :
                            video.current.playAsync()
                    }
                />

            </View>
            <View style={styles.buttons}>
                <ButtonComp
                    type='primary'
                    title={recording ? 'Parar Gravação' : 'Iniciar Gravação'}
                    onPress={recording ? stopRecording : startRecording}
                />
            </View>
            <View style={styles.buttons}>
                {soundUri && (
                    <ButtonComp
                        type='primary' title='Tocar som' onPress={playSound}
                    />
                )}
            </View>
        </View>
    );
}