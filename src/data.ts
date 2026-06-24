/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoreProject, ExplorationProject, CapabilityNode, ProjectMapping } from './types';

export const CORE_PROJECTS: CoreProject[] = [
  {
    id: 'chat-assistant',
    name: 'AI 聊天助手',
    tagline: '基于用户画像与聊天上下文，为社交用户生成自然、低压力、可发送的聊天建议。',
    problem: '陌生人社交中，用户匹配后常常“开口难、回复难”，导致匹配没有转化为真实会话。',
    designs: [
      '设计“候选建议 + 用户确认后发送”的 AI 辅助形态，避免自动代聊带来的失控感。',
      '按破冰、回复、重启三类场景拆分 Prompt 和上下文策略，让生成结果更贴近用户当前任务。',
      '通过多切入点候选和重试避重规则，降低用户反复生成但不满意的问题。'
    ],
    results: [
      { label: '双向会话渗透率', value: '35% → 52%', desc: '提升 17PP' },
      { label: '人均会话次数', value: '+20%', desc: '会话活跃度显著提升' },
      { label: '7日大盘留存', value: '+2PP', desc: '功能全面推全后表现' }
    ],
    reflection: 'AI 聊天助手的核心不是替用户聊天，而是降低表达成本，给用户提供可参考、可选择、可修改的沟通方向。'
  },
  {
    id: 'aigc-portrait',
    name: 'AIGC 人像生成',
    tagline: '将复杂的图像生成能力封装成普通用户可理解、可操作的风格化创作流程。',
    problem: '普通用户对 AI 图像生成感兴趣，但很难理解 Prompt、参数和模型能力，直接暴露生成能力会带来较高使用门槛。',
    designs: [
      '以“模板化创作”承接复杂模型能力，让用户只需选择模板、上传照片、查看结果。',
      '建立结构化 Prompt 与模板生产规范，支撑 7 大风格、13 类场景、100+ 模板批量生产。',
      '结合热点模板和地区化分发策略，提升模板点击和新增用户转化。'
    ],
    results: [
      { label: '功能渗透率', value: '20%+', desc: '核心功能高频使用' },
      { label: '生成结果保存率', value: '25% → 45%', desc: '满意度提升 20PP' },
      { label: '单个爆款模板新增', value: '20万+', desc: '低成本裂变级传播结果' }
    ],
    reflection: 'AIGC 产品的关键不是直接暴露模型能力，而是把模型能力封装成低门槛、结果稳定、可分享的创作流程。'
  }
];

export const EXPLORATION_PROJECTS: ExplorationProject[] = [
  {
    id: 'learn-page',
    name: '在线学习页面',
    tagline: '围绕 Agent 知识学习设计的可交互学习流程页面，展示学习流程、内容结构和交互体验设计能力。',
    status: '已上线',
    highlights: [
      '多层级学习路径拆解：动态解构章节学习节点与章节测试',
      '内容任务卡驱动：通过行动导向型任务，让学习不再枯燥',
      '互动式阶段测试：多维度多场景测评用户并输出反馈报告'
    ],
    tags: ['交互学习', '课程结构', '任务驱动'],
    hasDemo: true,
    linkType: 'page'
  },
  {
    id: 'job-agent',
    name: '求职 Agent',
    tagline: '基于求职偏好搜集岗位，提供岗位匹配分析与面试准备建议。',
    status: '迭代中',
    highlights: [
      '岗位主动搜集：智能遍历相关求职方向岗位信息',
      '岗位匹配度深度剖析：比对岗位JD与个人能力项',
      '简历针对性修改建议：挖掘并贴近岗位的闪光点'
    ],
    tags: ['Agent', '岗位匹配', '面试准备'],
    hasDemo: true,
    linkType: 'demo'
  },
  {
    id: 'ai-quota-monitor',
    name: 'AI 额度监控',
    tagline: '统一跟踪各家 AI 服务的额度与计费周期，主动提醒并沉淀历史记录，iOS / macOS 双端同步。',
    status: '制作中',
    highlights: [
      '多厂商额度配置：自定义各家 AI 服务的额度上限与循环周期',
      '用量进度可视化：实时呈现剩余额度与周期重置节点',
      '阈值智能提醒：接近上限或周期切换时主动推送提示',
      '跨端同步：iOS / macOS 双端记录与查看，规划更顺手'
    ],
    tags: ['额度监控', '多厂商', 'iOS / macOS'],
    hasDemo: false,
    linkType: 'none'
  }
];

export const CAPABILITY_NODES: CapabilityNode[] = [
  {
    id: 1,
    name: '发现问题',
    description: '识别值得解决的痛点',
    details: '从真实用户任务中识别痛点，而非为了 AI 而 AI。如在社交聊天场景识别“回复压力大、不知道说什么”的冷场行为特征。'
  },
  {
    id: 2,
    name: '判断 AI 价值',
    description: '匹配最适合的 AI 能力',
    details: '思考该问题是否最适合用自然语言生成、图像生成、语义或上下文理解来优雅处理。确保 AI 提供关键解法而非点缀。'
  },
  {
    id: 3,
    name: '设计产品链路',
    description: '把 AI 隐藏在操作路径后',
    details: '把 AI 技术能力包裹进用户可操作、能预测、易掌控的路径中，避免纯对话式界面的高交互负荷和不确定感。'
  },
  {
    id: 4,
    name: '组织上下文与策略',
    description: '构建稳定的 prompt 与工程',
    details: '设计约束机制、上下文优先级、提示词指令结构与预设候选，加入防翻车过滤与兜底机制，把模型的极度无序变为受控状态。'
  },
  {
    id: 5,
    name: '做出 Demo',
    description: '实现高可用原型以便验证',
    details: '通过构建核心 Demo 和高保真功能模型，直接让协作方和种子用户触摸交互、进行拟合，打磨主干体验与用户预期。'
  },
  {
    id: 6,
    name: '验证与迭代',
    description: '指标导向与反馈修正闭环',
    details: '通过采纳率、完成度、留存数据、功能保存率与用户 badcase 归类分析，找出模型或策略上的短板并以周为单位快速优化。'
  }
];

export const PROJECT_MAPPINGS: ProjectMapping[] = [
  {
    projectName: 'AI 聊天助手',
    mappings: [
      { nodeId: 1, action: '社交中开口难', result: '定位场景' },
      { nodeId: 2, action: '生成低压力回复建议', result: '自然语言处理' },
      { nodeId: 3, action: '候选话术 + 点击填入输入框', result: '降低失控感' },
      { nodeId: 4, action: '按破冰、回复、重启场景定制 Prompt与上下文', result: '提升匹配度' },
      { nodeId: 5, action: '构建可发送 UI 交互模型', result: '上线测试' },
      { nodeId: 6, action: '大盘双向会话率从 35% 提高到 52%', result: '核心价值验证' }
    ]
  },
  {
    projectName: 'AIGC 人像生成',
    mappings: [
      { nodeId: 1, action: '生成门槛高，普通人不懂参数', result: '定位场景' },
      { nodeId: 2, action: '将扩散模型及 Lora 封装', result: '图像生成承接' },
      { nodeId: 3, action: '选择预设模板 + 上传照片 + 一键查看结果', result: '模板化流程设计' },
      { nodeId: 4, action: '建立结构化 Prompt 库与风格库进行热更与分发', result: '批量生产策略' },
      { nodeId: 5, action: '搭建高贴合度演示和模板选页 Demo', result: '效率与效果校准' },
      { nodeId: 6, action: '生成保存率从 25% 翻回 45%', result: '爆款裂变验证' }
    ]
  }
];
