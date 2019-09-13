export const mediaDevices = {
  enumerateDevices: jest.fn().mockResolvedValue([
    {
      deviceId: 'default',
      groupId: '93f7124db4f938763012fa70d923a5832e6304d0bb0508c8a9283b6fb3e901fa',
      kind: 'audioinput',
      label: '',
    },
    {
      deviceId: 'a4d796b64c620eb6ac4c6fea8eb68d2a1edf765f9dcfa21a53f963e6ed5332d8',
      groupId: '23aa31907dfcec8059ab203aa6c0dbea57a5420f1c42fa94efdc5021041ee763',
      kind: 'videoinput',
      label: 'FaceTime HD, Camera',
    },
    {
      deviceId: 'default',
      groupId: '93f7124db4f938763012fa70d923a5832e6304d0bb0508c8a9283b6fb3e901fa',
      kind: 'audiooutput',
      label: '',
    },
  ]),
};

export const multipleCameras = {
  enumerateDevices: jest.fn().mockResolvedValue([
    {
      deviceId: 'a4d796b64c620eb6ac4c6fea8eb68d2a1edf765f9dcfa21a53f963e6ed5332d8',
      groupId: '23aa31907dfcec8059ab203aa6c0dbea57a5420f1c42fa94efdc5021041ee763',
      kind: 'videoinput',
      label: 'FaceTime HD, Camera',
    },
    {
      deviceId: 'default',
      groupId: '93f7124db4f938763012fa70d923a5832e6304d0bb0508c8a9283b6fb3e901fa',
      kind: 'videoinput',
      label: 'Extra test camera',
    },
  ]),
};
