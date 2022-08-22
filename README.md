# Mad Music Maker

## 1. 개발 인원

- 고려대학교 17학번 허회준
- KAIST 18학번 김성혁
- KAIST 22학번 김지나

## 2. 개발 환경

Client)

- React.js

Server)

- 서버 : node.js 와 Rust 로 개발되었습니다.
- DB : MySQL

## 3. 앱 소개

곡을 작곡하고 올릴 수 있는 간단한 웹 사이트입니다.

### 1) 웹사이트 구조

- 회원가입 / 로그인

![1](https://user-images.githubusercontent.com/80519883/185916951-1823044d-0ab1-404a-99bb-36c47babdb48.png)

- SongMaker / My Music
    
    ![2](https://user-images.githubusercontent.com/80519883/185917015-56cf3f06-22d0-4b7e-9efd-fc8db6149592.png)

    
    - SongMaker 버튼을 클릭하면 새로운 곡을 생성할 수 있는 창으로 이동합니다.
    - My Music 버튼을 클릭하면 지금까지 작곡한 음악 리스트를 볼 수 있습니다.
        
        ![3](https://user-images.githubusercontent.com/80519883/185917287-32781798-e7ef-4583-b216-780c5ea3ca51.png)
        
        설정한 곡명(Name)과 함께 wav 파일 다운로드 링크가 제공되며, 다운로드 링크를 클릭하여 곡을 재생할 수 있습니다.
        

### 2) SongMaker
#### 1]

![6](https://user-images.githubusercontent.com/80519883/185917271-83b3af5e-9104-498c-8853-4a42335ce33a.png)

SongMaker에서는 Name(곡명), Tempo, Rhythm 설정이 가능합니다.

+버튼과 Play Test 버튼, Upload 버튼, My Page 버튼이 있습니다.

- +버튼 : + 버튼을 클릭하면 작곡을 하는 창으로 넘어갑니다. + 버튼은 각각 한 종류의 악기에 대응하며, + 버튼을 통해 악기를 추가할 수 있습니다.
- Play Test : Play Test 버튼을 클릭하면 wave 파일이 생성되면서 다운로드가 됩니다. 파일을 실행시키면 작곡한 음악을 재생할 수 있습니다.
- Upload : Upload 버튼을 클릭하면 My Page로 해당 wave 파일이 업로드 됩니다.
- My Page : My Page 버튼을 클릭하여 그동안 생성한 음악 리스트를 확인할 수 있습니다.
#### 2]

+버튼을 눌렀을 때 이동하는 창입니다. Note Length, Note type를 지정할 수 있습니다.

![4](https://user-images.githubusercontent.com/80519883/185917201-19a18d9a-489e-4f58-93d4-e90a080e645d.png)

1) 기본 설정

- Note Length는 음의 길이에 해당하며, 표시된 각 세로 칸 수를 의미합니다. Note Length의 default 값은 1로 설정되어 있습니다.
- Note type는 악기 종류를 의미하며, sine, square, triangle, saw, synth1, synth2, kick, snare 총 8 종류의 악기가 있습니다. 이 중 하나를 선택하여 음표를 배치할 수 있습니다.

2) piano roll

- piano roll의 가로는 시간, 세로는 음을 의미합니다. piano roll은 가로 32칸(2마디)가 기본이며, 음은 C4(낮은 도)부터 C6(높은 도)까지로 구성되어 있습니다.
- piano roll의 각 칸을 클릭하면 해당 음계와 색상이 표시됩니다. 설정한 Note Length만큼 칸이 채워지며, 클릭한 칸을 다시 클릭하면 삭제가 가능합니다.

3) 악보

- A-G의 문자를 사용해 음을 표현하는 ABC notation을 통해 악보를 그립니다.

4) 버튼

- ← 버튼을 누르면 이전 창으로 이동하며, 작업 공간에 악보가 추가됩니다.
- 우측 상단의 + 버튼을 클릭하면 piano roll의 길이를 16칸 더 추가할 수 있습니다. 이를 통해 원하는 만큼 곡의 길이를 늘릴 수 있습니다.


해당 작업을 반복하면, 다음과 같이 작곡이 완성되며, 악기에 따른 악보를 함께 확인할 수 있습니다.

![5](https://user-images.githubusercontent.com/80519883/185917313-3715dd34-e0f4-461f-8e4e-25aa072a1eb6.png)

### 3) 오디오 생성

서버는 클라이언트로부터 악보 데이터를 받으면 이를 해석하여 음원 파일로 변환합니다.

- 먼저 WAV 파일을 생성한 후, 오디오의 재생에 필요한 여러 정보를 WAV 파일 헤더에 적습니다.
- 그 후, 악보 데이터를 바탕으로 각 음표의 데이터를 WAV 파일에 넣습니다.
    - 음표의 주파수, 악기 종류에 따라 음표의 데이터를 표현하는데 사용하는 파동 함수가 달라지므로, 여러 종류의 파동 함수를 준비해 사용했습니다.
- 마지막으로 생성된 WAV 파일을 전송합니다.
