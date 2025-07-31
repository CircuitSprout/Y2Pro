// Linked List implementation for music playlist
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  audioUrl: string;
  coverArt?: string;
}

export class SongNode {
  data: Song;
  next: SongNode | null;
  prev: SongNode | null;

  constructor(song: Song) {
    this.data = song;
    this.next = null;
    this.prev = null;
  }
}

export class PlaylistLinkedList {
  private head: SongNode | null;
  private tail: SongNode | null;
  private current: SongNode | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.size = 0;
  }

  // Add song to the end of playlist
  addSong(song: Song): void {
    const newNode = new SongNode(song);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  // Remove song by ID
  removeSong(id: string): boolean {
    let node = this.head;
    
    while (node) {
      if (node.data.id === id) {
        if (node.prev) {
          node.prev.next = node.next;
        } else {
          this.head = node.next;
        }
        
        if (node.next) {
          node.next.prev = node.prev;
        } else {
          this.tail = node.prev;
        }
        
        if (this.current === node) {
          this.current = node.next || node.prev;
        }
        
        this.size--;
        return true;
      }
      node = node.next;
    }
    
    return false;
  }

  // Get next song
  getNext(): Song | null {
    if (this.current?.next) {
      this.current = this.current.next;
      return this.current.data;
    }
    return null;
  }

  // Get previous song
  getPrevious(): Song | null {
    if (this.current?.prev) {
      this.current = this.current.prev;
      return this.current.data;
    }
    return null;
  }

  // Get current song
  getCurrentSong(): Song | null {
    return this.current?.data || null;
  }

  // Set current song by ID
  setCurrentSong(id: string): Song | null {
    let node = this.head;
    
    while (node) {
      if (node.data.id === id) {
        this.current = node;
        return node.data;
      }
      node = node.next;
    }
    
    return null;
  }

  // Update song data by ID
  updateSong(id: string, updatedSong: Song): boolean {
    let node = this.head;
    
    while (node) {
      if (node.data.id === id) {
        node.data = updatedSong;
        return true;
      }
      node = node.next;
    }
    
    return false;
  }

  // Get all songs as array
  getAllSongs(): Song[] {
    const songs: Song[] = [];
    let node = this.head;
    
    while (node) {
      songs.push(node.data);
      node = node.next;
    }
    
    return songs;
  }

  // Get playlist size
  getSize(): number {
    return this.size;
  }

  // Check if playlist is empty
  isEmpty(): boolean {
    return this.size === 0;
  }
}
