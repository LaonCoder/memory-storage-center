import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';


const postsDirectory = path.join(process.cwd(), 'posts');

console.log(process.cwd());   // C:\Users\user\dailyStudy\Web_Development\Next.js\nextjs_prac 
console.log(postsDirectory);  // C:\Users\user\dailyStudy\Web_Development\Next.js\nextjs_prac\posts

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);

    console.log(fileNames);  // [ 'pre-rendering.md', 'ssg-srr.md' ]

    const allPostsData = fileNames.map(fileName => {

        // '.md' 확장자 제거
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(postsDirectory, fileName);
        console.log(fullPath);  // ex) C:\Users\user\dailyStudy\Web_Development\Next.js\nextjs_prac\posts\pre-rendering.md

        // 마크다운 파일을 문자열로 읽어들인다.
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // gray-matter를 사용하여 metadata section을 파싱한다.
        const matterResult = matter(fileContents);

        return {
            id, ...(matterResult.data as {date: string, title: string})
        }
    })

    // date 순으로 정렬한다.
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}


export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    const processedContent = await remark().use(remarkHtml).process(matterResult.content);  // npm install remark remark-html --save
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...(matterResult.data as {date: string, title: string})
    }
}