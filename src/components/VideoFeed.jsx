import React, { useEffect, useState } from 'react';
import "../App.css"

export default function VideoFeed(props) {

  useEffect(() => {
    async function startPlay() {
      const videoEl = document.querySelector('.webrtc-video');
      const webrtcUrl = document.querySelector('#webrtc-url').value;

      const webrtc = new RTCPeerConnection({
        iceServers: [
          {
            urls: ['stun:stun.l.google.com:19302'],
          },
        ],
        sdpSemantics: 'unified-plan',
      });

      webrtc.ontrack = function (event) {
        videoEl.srcObject = event.streams[0];
      };

      webrtc.addTransceiver('video', { direction: 'sendrecv' });

      webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {
        const offer = await webrtc.createOffer();

        await webrtc.setLocalDescription(offer);

        fetch(webrtcUrl, {
          method: 'POST',
          body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),
        })
          .then((response) => response.text())
          .then((data) => {
            try {
              webrtc.setRemoteDescription(
                new RTCSessionDescription({ type: 'answer', sdp: atob(data) })
              );
            } catch (e) {
              console.warn(e);
            }
          });
      };

      const webrtcSendChannel = webrtc.createDataChannel('rtsptowebSendChannel');
      webrtcSendChannel.onopen = () => {
        console.log(`${webrtcSendChannel.label} has opened`);
        webrtcSendChannel.send('ping');
      };
      webrtcSendChannel.onclose = () => {
        console.log(`${webrtcSendChannel.label} has closed`);
        startPlay();
      };
    }

    startPlay();
  }, []);

  return (
    <div>
      <video className="webrtc-video" id={props.id} autoPlay playsInline controls style={{ maxWidth: '100%', maxHeight: '100%' }}></video>
      <input type="hidden" name="webrtc-url" id="webrtc-url" value="http://localhost:8083/stream/camera/channel/0/webrtc" />
    </div>
  );
}

