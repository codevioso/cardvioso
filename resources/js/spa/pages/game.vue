<template>

    <div class="game">
        <div class="card">
            <div v-for="(each, index) in cardData" :key="index" class="card-box" @click="rotate(index)">
                <div class="card-view front" :id="'front'+index">
                    <img :src="each.frontSrc" alt="image-front">
                </div>
                <div class="card-view back" :id="'back'+index">
                    <img :src="each.backSrc" alt="image-back">
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    data(){
        return {
            // Data Properties
            cardData: [
                { id: '0', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-1.png' },
                { id: '1', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-2.png' },
                { id: '2', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-3.png' },
                { id: '3', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-4.png' },
                { id: '4', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-5.png' },
                { id: '5', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-6.png' },
                { id: '6', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-7.png' },
                { id: '7', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-8.png' },
                { id: '8', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-1.png' },
                { id: '9', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-2.png' },
                { id: '10', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-3.png' },
                { id: '11', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-4.png' },
                { id: '12', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-5.png' },
                { id: '13', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-6.png' },
                { id: '14', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-7.png' },
                { id: '15', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-8.png' },
            ],
            firstImage: null,
            secondImage: null,
            lockBoard: false,
        }
    },
    mounted() {
        this.shuffleCard();
    },
    methods: {

        // Function of shuffle card when come from another route ( rand placement )
        shuffleCard() {
            for (let i = 0; i < this.cardData.length; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cardData[i], this.cardData[j]] = [this.cardData[j], this.cardData[i]];
            }
        },

        // Function of rotate image which is inside of card
        rotate(index) {

            // if lock board true and index equal to card one then return
            if(this.lockBoard || index === this.firstImage) return;

            // take dynamic index of front card and back card
            let frontCard = document.querySelector(`#front${index}`);
            let backCard = document.querySelector(`#back${index}`);

            // apply style of transform rotateY
            frontCard.style.transform = 'rotateY(-180deg)';
            backCard.style.transform = 'rotateY(0)';

            // take card image index
            if(this.firstImage === null) {
                this.firstImage = index;
            } else {
                this.secondImage = index;
                this.matchCard();
            }

        },

        // Function of matching card
        matchCard() {

            // take firstImage and secondImage backSrc as image match from cardData
            const cardMatchOne = this.cardData[this.firstImage].backSrc;
            const cardMatchTwo = this.cardData[this.secondImage].backSrc;

            // card image match or not match
            if(cardMatchOne === cardMatchTwo) {
                this.resetBoard();
            } else {
                this.shakeCardBox();
                setTimeout(() => {
                    this.flipCard();
                }, 500)
            }

        },

        // Function of reset rotate
        resetRotate() {

            // take card one and two as dynamic id
            let firstCardFront = document.querySelector(`#front${this.firstImage}`);
            let firstCardBack = document.querySelector(`#back${this.firstImage}`);
            let secondCardFront = document.querySelector(`#front${this.secondImage}`);
            let secondCardBack = document.querySelector(`#back${this.secondImage}`);

            // take card one and two apply style rotateY
            firstCardFront.style.transform = 'rotateY(0)';
            firstCardBack.style.transform = 'rotateY(-180deg)';
            secondCardFront.style.transform = 'rotateY(0)';
            secondCardBack.style.transform = 'rotateY(-180deg)';
        },

        // Function of shake card box
        shakeCardBox() {

            // take card one and two as dynamic id
            let firstCardFront = document.querySelector(`#front${this.firstImage}`);
            let firstCardBack = document.querySelector(`#back${this.firstImage}`);
            let secondCardFront = document.querySelector(`#front${this.secondImage}`);
            let secondCardBack = document.querySelector(`#back${this.secondImage}`);

            // take card one and two apply class list card shake
            firstCardFront.classList.add('card-shake');
            firstCardBack.classList.add('card-shake');
            secondCardFront.classList.add('card-shake');
            secondCardBack.classList.add('card-shake');

        },

        // Function of flip card
        flipCard() {
            this.resetRotate();
            this.resetBoard();
        },

        // Function of reset board card
        resetBoard() {

            // take card one and two as dynamic id
            let firstCardFront = document.querySelector(`#front${this.firstImage}`);
            let firstCardBack = document.querySelector(`#back${this.firstImage}`);
            let secondCardFront = document.querySelector(`#front${this.secondImage}`);
            let secondCardBack = document.querySelector(`#back${this.secondImage}`);

            // take card one and two apply class list card shake
            firstCardFront.classList.remove('card-shake');
            firstCardBack.classList.remove('card-shake');
            secondCardFront.classList.remove('card-shake');
            secondCardBack.classList.remove('card-shake');

            this.firstImage = null;
            this.secondImage = null;
            this.lockBoard = false;
        },

    }
}

</script>
