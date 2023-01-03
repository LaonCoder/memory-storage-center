# ✍️ **TIL - 2023년 1월 1일**

</br>

## ✔️ **GraphQL**
- **GraphQL** 이란 페이스북에서 만든 쿼리 언어이다.
- SQL은 데이터베이스 시스템에 저장된 데이터를 효율적으로 가져오는 것이 목적이고, GQL은 웹 클라이언트가 데이터를 서버로 부터 효율적으로 가져오는 것이 목적이라는 점에서 차이가 있다.
- SQL의 문장(statement)은 주로 백엔드 시스템에서 작성하고 호출하는 반면, GQL의 문장은 주로 클라이언트 시스템에서 작성하고 호출하게 된다.
- 출처 : [GraphQL 개념잡기 (hoon.choi)](https://tech.kakao.com/2019/08/01/graphql-basic/)

</br>

## ✔️ **Set up**
- npx create-next-app -e with-tailwindcss
- npm install graphql graphql-request html-react-parser moment react-multi-carousel sass

</br>

## ✔️ **[Tailwind CSS](https://tailwindcss.com/)**
- 미리 세팅된 유틸리티 클래스를 활용하여(Utility-First) HTML 코드 내에서 CSS 스타일링을 지원하는 프레임워크  

</br>

## ✔️ **헤더**
- Layout 컴포넌트의 자식 컴포넌트들이 `<Header />` 아래에 위치하도록 한다.
  ```jsx
  /* components/Layout.jsx */

  import React from "react";
  import { Header } from "./";

  const Layout = ({ children }) => {
    return (
      <div>
        <Header />
        {children}
      </div>
    );
  };

  export default Layout;
  ```

  ```jsx
  /* pages/_app.tsx */

  import React, { useEffect, useState } from "react";
  import { Layout } from "../components";
  import "tailwindcss/tailwind.css";
  import "../styles/globals.scss";

  import type { AppProps } from "next/app";

  function MyApp({ Component, pageProps }: AppProps) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  export default MyApp;
  ```

<br/>

## ✔️ **props.children**
- 다음과 같이 어떤 컴포넌트 사이에 위치한 자식 컴포넌트를 `props.children`을 통해 보여줄 수 있다.
  ```javascript
  import React from "react";

  // A wrapper component that adds a border around its children
  const Wrapper = (props) => {
    return <div style={{ border: "1px solid black" }}>{props.children}</div>;
  };

  const App = () => {
    return (
      <Wrapper>
        <p>Hello World!</p>
      </Wrapper>
    );
  };
  ```  

</br>

## ✔️ **props**
- `getPosts()`를 통해 비동기로 받아온 `posts`를 `props`에 할당하고 리턴하여 `Home` 컴포넌트에서 사용할 수 있다.
- 이는 `Home` 컴포넌트 내부에서 `props.posts` 또는 `posts`로 사용할 수 있다.
  ```jsx
  import { PostCard, Categories, PostWidget } from "../components";
  import { getPosts } from "../services";

  export default function Home({ posts }) {
    return (
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    );
  }

  export async function getStaticProps() {
    const posts = (await getPosts()) || [];
    return {
      props: { posts },
    };
  }
  ```  

<br/>

## ✔️ **react-moment**
- react-moment는 react에서 moment를 편리하게 사용할 수 있게 만들어 놓은 라이브러리이다.
- react-moment를 사용하면 별다른 작업 없어 실시간으로 시간을 변경할 수 있다.
- 설치 : `npm i moment react-moment`
    ```jsx
    import moment from "moment";
    //...(생략)
    {moment(post.createdAt).format('MMM DD, YYYY')}  // → Jan 01, 2023
</br>

## ✔️ **파일 기반 라우팅**
- 리액트의 경우, react-router-dom 패키지 설치하고 App.js에서 직접 코드를 작성하여 라우팅을 구현해야 하지만, Next.js는 디렉토리 구조를 통해 라우팅되어야 하는 파일들을 알아서 추론해준다.  
(`pages`라는 이름의 폴더 안에 파일을 만들면 알아서 라우팅해준다.)
- 동적 라우팅의 경우, 아래와 같이 파일 이름에 대괄호('[]')를 작성하여 구현할 수 있다.  
    - 동적 라우팅이란 부여받은 path값에 따라 동적으로 라우팅하는 것을 말한다. 
    - 화면 구조는 똑같지만 다른 데이터를 받아오는 경우 주로 사용된다.
    ```
    /pages
      └ index.js -> my-domain.com/
      └ about.js -> my-domain.com/about
      └ /products
        └ index.js -> my-domain.com/products
        └ [id].js -> my-domain.com/products/1
    ```
- 참조 : [Next.js 강의 정리: Pages & 파일 기반 라우팅 (zeroequaltwo.log)](https://velog.io/@zeroequaltwo/Next.js-%EA%B0%95%EC%9D%98-%EC%A0%95%EB%A6%AC-Pages-%ED%8C%8C%EC%9D%BC-%EA%B8%B0%EB%B0%98-%EB%9D%BC%EC%9A%B0%ED%8C%85)

</br>

## ✔️ **구조 분해 할당(Destructuring assignment)**
- 다음과 같이 객체로부터 속성을 해체하여 객체의 원래 속성명과는 다른 이름의 변수에 할당할 수도 있다.
    ```javascript
    const obj = {p: 42, q: true};
    const {p: foo, q: bar} = obj;

    console.log(foo);
    console.log(bar);
    ```  
- 참조 : [구조 분해 할당 (MDN web docs)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)


</br>

## ✔️ **Debugging**

</br>

### 1) **env 파일은 root에 저장해야 한다.**
- 아래의 `graphlAPI`를 통해 쿼리문으로 데이터를 가져올 때마다 `undefined`가 반환되는 문제가 있었는데,  
  이는 `'NEXT_PUBLIC_GRAPHCMS_ENDPOINT'`라는 환경변수를 설정할 때, `env` 파일을 'services'가 아닌 프로젝트의 최상위인 root에 저장하니 해결되었다.
- env 파일에는 포트, DB관련 정보, API_KEY 등등 개발자 혼자서 또는 팀만 알아야 하는 값을 저장한다.
  ```javascript
  /* services/index.js */

  import { request, gql } from "graphql-request";

  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  export const getPosts = async () => {
    const query = gql`
      query MyQuery {
        postsConnection {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
  };
  ```  
  ```
  NEXT_PUBLIC_GRAPHCMS_ENDPOINT=https://api-ap-northeast-1.hygraph.com/v2/.../master
  ```  

</br>

### 2) **Next/Image를 사용할 때 발생하는 Invalid src prop 에러**  
- 외부에서 이미지 파일을 불러왔을 때 발생하는 에러로, `next.config.js` 파일을 다음과 같이 수정해주면 해결된다.
    ```javascript
    /** @type {import('next').NextConfig} */
    module.exports = {
        reactStrictMode: true,
        images: {
            domains: ['media.graphassets.com']  // 외부 이미지를 가져올 링크
        }
    }
    ```
- next.js를 사용할 때 `Next/Image` 컴포넌트를 사용하면 이미지를 최적화할 수 있다.
- `Next/Image` 컴포넌트에서 제공하는 기능은 다음과 같다.
    - **Lazy loading**  
        - 이미지의 로딩 시점을 필요할 때까지 지연시키는 기술
        - 스크린 안에 보여지는 이미지만을 로드하여 대역폭 사용을 줄이고, 필요한 이미지만 빠르게 로드할 수 있도록 한다.
    - **이미지 사이즈 최적화**
        - 디바이스 크기 별 srcSet을 미리 지정해두고, 사용자의 디바이스에 맞는 이미지를 다운로드할 수 있게 지원한다.  
    - **placeholder 제공**
        - 어떤 웹 사이트에 방문했을 때 이미지가 로드되기 전까지 영역의 높이가 0이었다가 이미지가 로드된 후 이미지만큼 영역이 늘어나 레이아웃이 흔들리는 현상을 **CLS(Cumulative Layout Shift)** 라고 한다.  
        - `Next/Image`는 이처럼 레이아웃이 흔들리는 현상을 방지하기 위해 placeholder를 제공한다.  
        - 이미지가 로드되기 전에도 이미지 높이만큼 영역을 표시해서 이미지가 로드된 후에 레이아웃이 흔들리지 않도록 하는 것이다.  
- 참조 : [Next/Image를 활용한 이미지 최적화 (Kakao Entertainment FE 기술블로그)](https://velog.io/@zeroequaltwo/Next.js-%EA%B0%95%EC%9D%98-%EC%A0%95%EB%A6%AC-Pages-%ED%8C%8C%EC%9D%BC-%EA%B8%B0%EB%B0%98-%EB%9D%BC%EC%9A%B0%ED%8C%85)

</br>


> 참조 : [Build and Deploy THE BEST Modern Blog App with React | GraphQL, NextJS, Tailwind CSS (Javascript Mastery)](https://www.youtube.com/watch?v=HYv55DhgTuA&ab_channel=JavaScriptMastery)
