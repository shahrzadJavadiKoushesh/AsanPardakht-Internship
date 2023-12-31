import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InteractiveCommentSection';

  showReply: boolean = false;
  selectedComment: Record<string, any> = {};


  data = {
    "currentUser": {
      "image": {
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "../assets/images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": {
            "png": "./images/avatars/image-amyrobson.png",
            "webp": "../assets/images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": {
            "png": "./images/avatars/image-maxblagun.png",
            "webp": "../assets/images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": {
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "../assets/images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "../assets/images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          },
          {
            "id": 5,
            "content": "Wow, this React app's user interface is so responsive and sleek, making for an amazing user experience!",
            "createdAt": "1 day ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "../assets/images/avatars/image-amyrobson.webp"
              },
              "username": "amyrobson"
            }
          },
          {
            "id": 6,
            "content": "viverra fermentum metus elementum, ornare",
            "createdAt": "1 month ago",
            "score": 0,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "../assets/images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }

        ]
      },
      {
        "id": 3,
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,",
        "createdAt": "1 week ago",
        "score": 0,
        "user": {
          "image": {
            "png": "../assets/images/avatars/image-ramsesmiron.png",
            "webp": "../assets/images/avatars/image-ramsesmiron.webp"
          },
          "username": "ramsesmiron"
        },
        "replies": []
      },
    ]
  }

  filteredComments: any[] =  JSON.parse(JSON.stringify(this.data.comments)) ;

  addReply(comment: any) {
    this.selectedComment = comment;
    this.showReply = true;
  }

  addReplyEmmitdByChild(value: Record<string, any>) {
    if (this.selectedComment) {
      this.selectedComment['replies'] = [...this.selectedComment['replies'], value]
    }
    this.showReply = false;
  }

  addCommentEmittedByChild(value: {
    "id": number,
    "content": string,
    "createdAt": string,
    "score": number,
    "user": {
      "image": {
        "png": string,
        "webp": string
      },
      "username": string
    },
    "replies": []
  }) {
    this.data.comments.push(value)
    this.filteredComments = JSON.parse(JSON.stringify(this.data.comments))
    
  }

  changeScroe(comment: any, isPlus: boolean) {
    if (isPlus) {
      comment.score++
    }
    else {
      if (comment.score > 0)
        comment.score--
    }
  }

  filterByUserOrContent(query: string, isUsername: boolean) {
    if (query.trim() === '') {
      // Reset to the original comments array when the query is empty
      this.filteredComments = JSON.parse(JSON.stringify(this.data.comments));
    } else {
      if (isUsername) {

        this.filteredComments = this.data.comments.filter(comment =>
          comment.user.username.toLowerCase().includes(query.toLowerCase())
        );

        const filteredReplies: any[] = [];

        this.data.comments.forEach(comment => {
          if (comment.replies.length > 0) {
            const matchingReply = comment.replies.filter(reply =>
              reply.user.username.toLowerCase().includes(query.toLowerCase())
            );
            if (matchingReply.length != 0) {
              console.log("FGHJK")
              filteredReplies.push(
                ...[{
                  ...comment,
                  replies: matchingReply,
                }]
              );
            }
          }
        });

        this.filteredComments = [...this.filteredComments, ...filteredReplies];

      } else {
        this.filteredComments = this.data.comments.map(comment => ({
          ...comment,
          replies: comment.replies.filter(reply =>
            reply.content.toLowerCase().includes(query.toLowerCase())
          ),
        })).filter(comment =>
          comment.content.toLowerCase().includes(query.toLowerCase()) ||
          comment.replies.length > 0
        );
      }
    }
  }
}