export class Notification {
  
  title: string
  userId: string
  isActive: boolean

  constructor(title: string, userId: string ) {
    this.title = title
    this.userId = userId
    this.isActive = true
  }

  markAsRead() {
    this.isActive = false
  }

}
