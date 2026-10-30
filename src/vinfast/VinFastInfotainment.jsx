import React, { useState, useEffect, useRef } from 'react';
import { InfotainmentHeader } from './components/InfotainmentHeader';
import { InfotainmentDock } from './components/InfotainmentDock';
import { ScenarioBar } from './components/ScenarioBar';
import { Screen1NavigationHome } from './screens/Screen1NavigationHome';
import { Screen2AiVoiceAssistant } from './screens/Screen2AiVoiceAssistant';
import { Screen3StationDetails } from './screens/Screen3StationDetails';
import { Screen4ChargingLive } from './screens/Screen4ChargingLive';
import { 
  playWakeChime, 
  playWarningChime, 
  playSelectChime, 
  playCheckinChime, 
  playSuccessFanfare, 
  speakVietnamese, 
  stopSpeech 
} from './utils/audioEffects';

export const VinFastInfotainment = () => {
  // Navigation & Screen Flow State
  const [currentScreen, setCurrentScreen] = useState(1);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  
  // Audio & Scenario Automation State
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [viewMode, setViewMode] = useState('bezel'); // 'bezel' | 'cockpit' | 'fluid'
  const autoPlayTimerRef = useRef(null);

  // Play warning chime when first entering Screen 1
  useEffect(() => {
    if (isAudioEnabled && currentScreen === 1) {
      playWarningChime();
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      stopSpeech();
    };
  }, []);

  // Handler for manual screen jumps
  const handleSelectScreen = (screenId) => {
    stopAutoPlay();
    playSelectChime();
    setCurrentScreen(screenId);
    if (screenId === 2) {
      setIsVoiceActive(true);
    } else {
      setIsVoiceActive(false);
    }

    if (screenId === 4 && isAudioEnabled) {
      playCheckinChime();
    }
  };

  // Handler for triggering Voice Assistant (Screen 2 popup)
  const handleTriggerVoice = () => {
    if (isAudioEnabled) playWakeChime();
    setIsVoiceActive(true);
    setCurrentScreen(2);

    if (isAudioEnabled) {
      speakVietnamese("Hệ thống ghi nhận trạm A đang quá tải, thời gian chờ dự kiến 25 phút. AI đề xuất bạn rẽ sang Siêu trạm sạc B cách 3.2km, hiện đang trống trụ và thời gian chờ bằng 0 phút.");
    }
  };

  // Handler for accepting reroute from Screen 2 -> Screen 3
  const handleAcceptReroute = () => {
    if (isAudioEnabled) playSelectChime();
    setIsVoiceActive(false);
    setCurrentScreen(3);

    if (isAudioEnabled) {
      speakVietnamese("Đã chuyển lộ trình sang Siêu trạm sạc B. Thời gian chờ dự kiến bằng 0 phút. Đã giữ chỗ trụ sạc số 08 cho bạn.");
    }
  };

  // Handler for keeping old route
  const handleKeepOldRoute = () => {
    if (isAudioEnabled) playSelectChime();
    setIsVoiceActive(false);
    setCurrentScreen(1);
  };

  // Handler for starting navigation from Screen 3 -> Screen 4 (Geo-fencing simulation)
  const handleStartNavigation = () => {
    if (isAudioEnabled) playSelectChime();
    setCurrentScreen(4);

    if (isAudioEnabled) {
      setTimeout(() => {
        playCheckinChime();
        speakVietnamese("Đã vào khuôn viên Siêu trạm sạc B. Hệ thống AI đã tự động ghi nhận check-in phiên sạc tại trụ số 08.");
      }, 700);
    }
  };

  // Handler for resetting scenario to beginning
  const handleResetScenario = () => {
    stopAutoPlay();
    stopSpeech();
    setCurrentScreen(1);
    setIsVoiceActive(false);
    setAlertVisible(true);
    if (isAudioEnabled) playWarningChime();
  };

  // Autoplay flow execution
  const stopAutoPlay = () => {
    setIsPlayingAuto(false);
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    stopSpeech();
  };

  const handleToggleAutoPlay = () => {
    if (isPlayingAuto) {
      stopAutoPlay();
      return;
    }

    setIsPlayingAuto(true);
    // Start automated step sequence:
    // Step 1: Start at Screen 1
    setCurrentScreen(1);
    setIsVoiceActive(false);
    setAlertVisible(true);
    if (isAudioEnabled) {
      playWarningChime();
      speakVietnamese("Pin xe còn 15%. Bạn có muốn tìm siêu trạm sạc gần nhất trên tuyến đường không?");
    }

    // Step 2: After 5s -> Transition to Screen 2 (ViVi Voice Proposal)
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentScreen(2);
      setIsVoiceActive(true);
      if (isAudioEnabled) {
        playWakeChime();
        speakVietnamese("Hệ thống ghi nhận trạm A đang quá tải, thời gian chờ dự kiến 25 phút. AI đề xuất bạn rẽ sang Siêu trạm sạc B cách 3.2km, hiện đang trống trụ và thời gian chờ bằng 0 phút.");
      }

      // Step 3: After 7.5s -> Accept Reroute to Screen 3 (Station details)
      autoPlayTimerRef.current = setTimeout(() => {
        setCurrentScreen(3);
        setIsVoiceActive(false);
        if (isAudioEnabled) {
          playSelectChime();
          speakVietnamese("Đã điều hướng sang Siêu trạm sạc VinFast cao tốc. Trạm có 20 trụ sạc, tỷ lệ khai thác 45%, thời gian chờ 0 đến 3 phút.");
        }

        // Step 4: After 7.5s -> Auto Check-in & Live Charging (Screen 4)
        autoPlayTimerRef.current = setTimeout(() => {
          setCurrentScreen(4);
          if (isAudioEnabled) {
            playCheckinChime();
            speakVietnamese("Đã vào khuôn viên Siêu trạm sạc B. Hệ thống AI đã tự động ghi nhận check-in phiên sạc tại trụ 300kW số 08.");
          }
          setIsPlayingAuto(false);
        }, 8000);

      }, 8000);

    }, 5500);
  };

  return (
    <div className={`vinfast-experience-wrapper view-${viewMode}`}>
      {/* Top Scenario Presentation Bar */}
      <ScenarioBar 
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        isPlayingAuto={isPlayingAuto}
        onToggleAutoPlay={handleToggleAutoPlay}
        onResetScenario={handleResetScenario}
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={() => {
          const next = !isAudioEnabled;
          setIsAudioEnabled(next);
          if (!next) stopSpeech();
        }}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
      />

      {/* Main Infotainment Layout Container */}
      <div className="infotainment-stage">
        {/* Cockpit Overlay (When Cockpit view is active) */}
        {viewMode === 'cockpit' && (
          <div className="cockpit-background-frame">
            <img 
              src="/vinfast_vf8_cockpit.jpg" 
              alt="VinFast VF8 Cockpit" 
              className="cockpit-bg-img"
            />
          </div>
        )}

        {/* 15.6-inch Automotive Touchscreen Frame */}
        <div className="infotainment-bezel-frame">
          <div className="infotainment-screen-glass">
            {/* Top Status Bar of Vehicle */}
            <InfotainmentHeader 
              batteryPercent={currentScreen === 4 ? 42 : 15}
              isCharging={currentScreen === 4}
              chargingKw={currentScreen === 4 ? 248.5 : 0}
            />

            {/* Middle Body: Dock + Main Active Screen */}
            <div className="infotainment-body-layout">
              {/* Left Dock Navigation */}
              <InfotainmentDock 
                currentScreen={currentScreen}
                onTriggerVoice={handleTriggerVoice}
                onGoToScreen={handleSelectScreen}
                isVoiceActive={isVoiceActive}
              />

              {/* Main Display Canvas */}
              <main className="infotainment-main-viewport">
                {/* Screen 1: Home / Navigation */}
                {currentScreen === 1 && (
                  <Screen1NavigationHome 
                    onTriggerVoice={handleTriggerVoice}
                    onSelectStation={(station) => {
                      if (station === 'B') setCurrentScreen(3);
                      else handleTriggerVoice();
                    }}
                    onDismissAlert={() => setAlertVisible(false)}
                    alertVisible={alertVisible}
                  />
                )}

                {/* Screen 2: AI Voice Assistant Widget (Modal over Map) */}
                {currentScreen === 2 && (
                  <>
                    <Screen1NavigationHome 
                      onTriggerVoice={() => {}}
                      onSelectStation={() => {}}
                      onDismissAlert={() => {}}
                      alertVisible={false}
                    />
                    <Screen2AiVoiceAssistant 
                      onAcceptReroute={handleAcceptReroute}
                      onKeepOldRoute={handleKeepOldRoute}
                      onClose={() => setCurrentScreen(1)}
                    />
                  </>
                )}

                {/* Screen 3: Station Details & Predictive Queue */}
                {currentScreen === 3 && (
                  <Screen3StationDetails 
                    onStartNavigation={handleStartNavigation}
                    onBackToOverview={() => setCurrentScreen(1)}
                  />
                )}

                {/* Screen 4: Auto Check-in & Live Charging Status */}
                {currentScreen === 4 && (
                  <Screen4ChargingLive 
                    onFinishCharging={() => {
                      if (isAudioEnabled) playSuccessFanfare();
                    }}
                    onRestartScenario={handleResetScenario}
                    initialBattery={15}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
