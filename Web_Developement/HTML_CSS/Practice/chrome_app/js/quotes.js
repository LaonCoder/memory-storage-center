const quotes = [
    {
        quote: "언제나 현재에 집중할 수 있다면 행복할 것이다.",
        author: "파울로 코엘료"
    },
    {
        quote: "진정으로 웃으려면 고통을 참아야하며 , 나아가 고통을 즐길 줄 알아야 한다.",
        author: "찰리 채플린"
    },
    {
        quote: "피할수 없으면 즐겨라.",
        author: "로버트 엘리엇"
    },
    {
        quote: "절대 어제를 후회하지 마라. 인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다.",
        author: "L.론허바드"
    },
    {
        quote: "어리석은 자는 멀리서 행복을 찾고, 현명한 자는 자신의 발치에서 행복을 키워간다.",
        author: "제임스 오펜하임"
    },
    {
        quote: "평생 살 것처럼 꿈을 꾸어라. 그리고 내일 죽을 것처럼 오늘을 살아라.",
        author: "제임스 딘"
    },
    {
        quote: "만약 우리가 할 수 있는 일을 모두 한다면, 우리들은 우리 자신에 깜짝 놀랄 것이다.",
        author: "에디슨"
    },
    {
        quote: "사람이 여행을 하는 것은 도착하기 위해서가 아니라 여행하기 위해서이다.",
        author: "괴테"
    },
    {
        quote: "인생이란 학교에는 불행이란 훌륭한 스승이 있다. 그 스승 때문에 우리는 더욱 단련되는 것이다.",
        author: "프리체"
    },
    {
        quote: "인생을 다시 산다면 다음번에는 더 많은 실수를 저지르리라.",
        author: "나딘 스테어"
    },
    {
        quote: "이미 끝나버린 일을 후회하기보다는 하고 싶었던 일들을 하지 못한 것을 후회하라.",
        author: "탈무드"
    }
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

function showQuote() {
    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quote.innerText = todaysQuote.quote;
    author.innerText = ` - ${todaysQuote.author}`;
}

showQuote();
setInterval(showQuote, 10000);



