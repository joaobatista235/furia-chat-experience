export class Message {
  constructor(id, content, sender, timestamp, isLive = false) {
    this.id = id;
    this.content = content;
    this.sender = sender;
    this.timestamp = timestamp;
    this.isLive = isLive;
  }

  static create(content, sender, isLive = false) {
    return new Message(
      crypto.randomUUID(),
      content,
      sender,
      new Date(),
      isLive
    );
  }
} 