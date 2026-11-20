(function() {
    const MaxWidth = 768;
    const MaxHeight = 1336;
    const MinWidth = 576;
    const MinHeight = 1024;

    const resizeGameDiv = function(realWidth, realHeight) {
        let gameWidth = MinWidth;
        let gameHeight = MinHeight;
        let canvasWidth = gameWidth;
        let canvasHeight = gameHeight;
        
        gameHeight = Math.round(gameWidth * realHeight / realWidth);
        gameHeight = Math.min(gameHeight, MaxHeight);
        gameHeight = Math.max(gameHeight, MinHeight);
        gameWidth = Math.round(realWidth * gameHeight / realHeight);
        gameWidth = Math.min(gameWidth, MaxWidth);
        gameWidth = Math.max(gameWidth, MinWidth);
    
        const windowRatio = realWidth / realHeight;
        const gameRatio = gameWidth / gameHeight;
    
        if (gameRatio > windowRatio) {
            canvasWidth = realWidth;
            canvasHeight = realWidth * gameHeight / gameWidth;
        } else {
            canvasWidth = realHeight * gameWidth / gameHeight;
            canvasHeight = realHeight;
        }
    
        const div = document.getElementById("GameDiv");
        div.style.width = canvasWidth + 'px';
        div.style.height = canvasHeight + 'px';

        // if (cc.sys.isMobile && typeof screen !== 'undefined') {
        //     if (window.innerWidth === screen.height) {
        //         const div = document.getElementById('RotateDiv');
        //         div.setAttribute('style', `transform: rotate(90deg);width: ${canvasHeight}px; height:${canvasWidth}px;`);
        //     }
        // }
    };

    // window.addEventListener('orientationchange', () => {
    //     if (cc.sys.isMobile && typeof screen !== 'undefined') {
    //         const div = document.getElementById('RotateDiv');

    //         if (window.innerWidth === screen.height) {
    //             div.setAttribute('style', `transform: rotate(90deg);width: ${cc.game.container.style.height}; height:${cc.game.container.style.width};`);
    //         } else {
    //             div.setAttribute('style', `transform: rotate(0deg);width: ${cc.game.container.style.width}; height:${cc.game.container.style.height};`);
    //         }
    //     }
    // });

    window.addEventListener('load', () => {
        let realWidth = window.innerWidth;
        let realHeight = window.innerHeight;

        if (typeof screen !== 'undefined' && screen.width < realWidth) {
            realWidth = screen.width;
            realHeight = screen.height - 130;
        }

        resizeGameDiv(realWidth, realHeight);
    });
})();
