import { Button } from './'

import BluetoothAudioIcon from '@mui/icons-material/BluetoothAudio';

const meta = {
    component: Button
}

export default meta

export const Text = {
    args: {
        children: [ 'Button text' ],
        round: false,
        action: () => alert('Button action fired!')
    }
}

export const Icon = {
    args: {
        ...Text.args,
        children: [
            <BluetoothAudioIcon />,
            "Bluetooth"
        ],
        round: true
    }
}

export const LongText = {
    args: {
        ...Text.args,
        children: [ 'A long text into a button' ],
        round: false
    }
}

export const Custom = {
    args: {
        ...Text.args,
        children: [ 'Inline CSS button' ],
        height: '40px',
        backgroundColor: '#EEFFEE'
    }
}