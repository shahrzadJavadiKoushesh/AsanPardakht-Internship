import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(comments: any[], searchText: string, isUsername: string): any[] {
    if (!comments || !searchText) {
      return comments;
    }

    searchText = searchText.toLowerCase();

    let commentsCopy = JSON.parse(JSON.stringify(comments));

    return commentsCopy.filter((comment: any) => {
      if (isUsername === "ByUsername") {
        if (comment.user.username.toLowerCase().includes(searchText)) {
          return true;
        }
      } else {
        if (comment.content.toLowerCase().includes(searchText)) {
          return true;
        }
      }

      const repliesCopy = JSON.parse(JSON.stringify(comment.replies));

      const matchingReplies = repliesCopy.filter((reply: any) => {
        if (isUsername === "ByUsername") {
          return reply.user.username.toLowerCase().includes(searchText);
        } else {
          return reply.content.toLowerCase().includes(searchText);
        }
      });

      comment.replies = matchingReplies;
      console.log("Comments", comments)
      console.log("Copy", commentsCopy)

      return comment.replies.length > 0;
    });
  }
}