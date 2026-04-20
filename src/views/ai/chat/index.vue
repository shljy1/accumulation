<template>
  <div class="flex flex-col h-full bg-[var(--el-bg-color-page)]">
    <!-- 头部 -->
    <div
      class="flex-bc px-6 py-4 border-b border-[var(--el-border-color-light)]"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary flex-c">
          <el-icon color="#fff" :size="20"><ChatLineRound /></el-icon>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-[var(--el-text-color-primary)]">
            AI 助手
          </h2>
          <p class="text-xs text-[var(--el-text-color-secondary)]">
            基于 coding-glm-5.1-free
          </p>
        </div>
      </div>
      <el-button type="danger" text @click="clearMessages">
        <el-icon class="mr-1"><Delete /></el-icon>
        清空对话
      </el-button>
    </div>

    <!-- 消息列表 -->
    <div ref="messageContainer" class="flex-1 overflow-y-auto p-6 space-y-6">
      <div
        v-if="messages.length === 0"
        class="flex flex-col items-center justify-center h-full text-[var(--el-text-color-secondary)]"
      >
        <el-icon :size="64" class="mb-4 opacity-40"><ChatLineRound /></el-icon>
        <p class="text-lg">开始与 AI 对话吧</p>
        <p class="text-sm mt-2 opacity-60">输入问题，AI 将为您解答</p>
      </div>

      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex gap-4"
        :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
      >
        <!-- 头像 -->
        <div
          class="w-9 h-9 rounded-full flex-c shrink-0"
          :class="
            msg.role === 'user' ? 'bg-primary' : 'bg-[var(--el-color-success)]'
          "
        >
          <el-icon color="#fff" :size="18">
            <UserFilled v-if="msg.role === 'user'" />
            <Cpu v-else />
          </el-icon>
        </div>

        <!-- 内容 -->
        <div
          class="flex flex-col max-w-[80%]"
          :class="msg.role === 'user' ? 'items-end' : 'items-start'"
        >
          <div class="text-xs text-[var(--el-text-color-secondary)] mb-1 px-1">
            {{ msg.role === "user" ? "我" : "AI" }} · {{ formatTime(msg.time) }}
          </div>
          <div
            class="px-4 py-3 rounded-2xl text-sm leading-relaxed break-words"
            :class="
              msg.role === 'user'
                ? 'bg-primary text-white rounded-tr-sm'
                : 'bg-[var(--el-bg-color)] text-[var(--el-text-color-primary)] rounded-tl-sm border border-[var(--el-border-color-light)]'
            "
          >
            <template v-if="msg.thinking && msg.thinking.trim()">
              <div
                class="mb-2 pb-2 border-b border-[var(--el-border-color-light)] opacity-70"
              >
                <div class="text-xs font-medium mb-1">思考过程</div>
                <div class="text-xs whitespace-pre-wrap">
                  {{ msg.thinking }}
                </div>
              </div>
            </template>
            <div class="whitespace-pre-wrap">{{ msg.content }}</div>
          </div>
        </div>
      </div>

      <!-- 加载中 -->
      <div v-if="loading" class="flex gap-4">
        <div
          class="w-9 h-9 rounded-full bg-[var(--el-color-success)] flex-c shrink-0"
        >
          <el-icon color="#fff" :size="18"><Cpu /></el-icon>
        </div>
        <div
          class="px-4 py-3 rounded-2xl rounded-tl-sm bg-[var(--el-bg-color)] border border-[var(--el-border-color-light)]"
        >
          <div
            class="flex items-center gap-2 text-[var(--el-text-color-secondary)]"
          >
            <el-icon class="animate-spin"><Loading /></el-icon>
            <span class="text-sm">AI 正在思考中...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div
      class="p-4 border-t border-[var(--el-border-color-light)] bg-[var(--el-bg-color)]"
    >
      <div class="flex gap-3 items-end max-w-4xl mx-auto">
        <div class="flex-1 relative">
          <el-input
            v-model="inputMessage"
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入您的问题，Shift + Enter 换行，Enter 发送"
            class="chat-input"
            @keydown.enter.prevent="handleEnter"
          />
        </div>
        <el-button
          type="primary"
          :disabled="!inputMessage.trim() || loading"
          :loading="loading"
          class="!h-[74px] !px-6"
          @click="sendMessage"
        >
          <el-icon class="mr-1" :size="16"><Promotion /></el-icon>
          发送
        </el-button>
      </div>
      <p
        class="text-center text-xs text-[var(--el-text-color-secondary)] mt-2 opacity-60"
      >
        AI 生成内容仅供参考，请核实重要信息
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  ChatLineRound,
  UserFilled,
  Cpu,
  Delete,
  Loading,
  Promotion
} from "@element-plus/icons-vue";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  thinking?: string;
  time: number;
}

const messages = ref<ChatMessage[]>([]);
const inputMessage = ref("");
const loading = ref(false);
const messageContainer = ref<HTMLDivElement>();

// 格式化时间
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
}

// 处理键盘事件
function handleEnter(e: KeyboardEvent) {
  if (!e.shiftKey) {
    sendMessage();
  }
}

// 清空对话
function clearMessages() {
  messages.value = [];
}

// 发送消息
async function sendMessage() {
  const content = inputMessage.value.trim();
  if (!content || loading.value) return;

  // 添加用户消息
  messages.value.push({
    role: "user",
    content,
    time: Date.now()
  });
  inputMessage.value = "";
  scrollToBottom();

  loading.value = true;

  try {
    const response = await fetch("https://aihubmix.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AI_APIKEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_AI_MODEL,
        messages: messages.value.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        thinking: {
          type: "enabled"
        },
        max_tokens: 65536,
        temperature: 1.0
      })
    });

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message;

    if (assistantMessage) {
      messages.value.push({
        role: "assistant",
        content: assistantMessage.content || "",
        thinking: assistantMessage.reasoning_content || "",
        time: Date.now()
      });
    } else {
      throw new Error("响应格式异常");
    }
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : "请求发生错误");
    messages.value.push({
      role: "assistant",
      content: "抱歉，请求发生错误，请稍后重试。",
      time: Date.now()
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
}

onMounted(() => {
  // 页面加载后聚焦输入框
  const textarea = document.querySelector(
    ".chat-input textarea"
  ) as HTMLTextAreaElement;
  if (textarea) textarea.focus();
});

defineOptions({
  name: "chatPage"
});
</script>

<style lang="scss" scoped>
/* 自定义滚动条 */
.overflow-y-auto {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--el-border-color);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--el-text-color-disabled);
  }
}

:deep(.chat-input) {
  .el-textarea__inner {
    border-radius: 12px;
    padding: 12px 16px;
    background: var(--el-bg-color-page);
    border-color: var(--el-border-color);
    resize: none;
    &:focus {
      border-color: var(--el-color-primary);
    }
  }
}
</style>
